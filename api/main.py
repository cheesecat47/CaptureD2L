import os
import time
from pathlib import Path
from uuid import uuid4

from captured2l import captured2l
from captured2l.model.image import ImageUpload, save_image
from config import Settings, get_settings
from fastapi import Depends, FastAPI, File, Query, UploadFile
from fastapi.responses import FileResponse
from loguru import logger
from starlette.middleware.cors import CORSMiddleware

BASE_DIR = Path(__file__).resolve().parent


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
)


@app.on_event('startup')
async def startup_event():
    log_dir = os.path.join(BASE_DIR, 'logs')
    os.makedirs(log_dir, exist_ok=True)
    logger.add(os.path.join(log_dir, 'api.log'),
               backtrace=True, diagnose=True,
               rotation="1 day", compression="gz", colorize=True)
    logger.info(f"API Server start at {time.time_ns()}")


@app.on_event('shutdown')
async def shutdown_event():
    logger.info(f"API Server shutdown at {time.time_ns()}")


@app.get('/')
async def root(
    settings: Settings = Depends(get_settings)
):
    return {
        "message": "Hello World",
        "app_name": settings.app_name
    }


@app.post(
    '/invert',
    response_class=FileResponse
)
async def invert(
    file: UploadFile = File(...),
    gamma: float = Query(default=1.8, gt=-3.0, le=3.0),
):
    this_uuid = uuid4()
    upload_dir = os.path.join(BASE_DIR, 'uploads', str(this_uuid))
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir, exist_ok=True)
        logger.info(f"{upload_dir = }")

    upload_path = os.path.join(upload_dir, file.filename)
    logger.info(f"{upload_path = }")

    this_image = ImageUpload(
        img_path=upload_path,
        uuid=this_uuid,
        file=file,
        gamma=gamma
    )
    logger.info(f"{this_image = }")

    try:
        await save_image(image=this_image)
        logger.info(f"Success to save image: {this_image}")
    except Exception as e:
        err_msg = f"Failed to save the uploaded image: {e}"
        logger.exception(err_msg)
        return {"message": err_msg}

    try:
        this_image.out_path = await captured2l.invert_dark_to_light(this_image)
        logger.info(f"Success to invert image: {this_image.out_path}")

        return FileResponse(this_image.out_path,
                            media_type="image/png",
                            filename=os.path.basename(this_image.out_path))
    except Exception as e:
        logger.exception(
            f"Failed to convert {this_image.img_path} to light theme: {e}")
