import os
from pathlib import Path
from uuid import uuid4

from captured2l import captured2l
from captured2l.model.image import ImageUpload, save_image
from config import Settings, get_settings
from fastapi import Depends, FastAPI, File, UploadFile
from fastapi.responses import FileResponse

BASE_DIR = Path(__file__).resolve().parent


app = FastAPI()


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
    # gamma:
):
    this_uuid = uuid4()
    upload_dir = os.path.join(BASE_DIR, 'uploads', str(this_uuid))
    os.makedirs(upload_dir, exist_ok=True)

    upload_path = os.path.join(upload_dir, file.filename)
    print(f"{upload_path = }")

    this_image = ImageUpload(
        img_path=upload_path,
        uuid=this_uuid,
        file=file
    )
    print(f"{this_image = }")

    try:
        await save_image(image=this_image)
    except Exception as e:
        err_msg = f"Failed to save the uploaded image: {e}"
        print(err_msg)
        return {"message": err_msg}

    await captured2l.invert_dark_to_light(this_image)

    return FileResponse(this_image.out_path)
