from uuid import UUID

import aiofiles
from fastapi import UploadFile
from loguru import logger
from pydantic import BaseModel


class ImageUpload(BaseModel):
    img_path: str
    out_path: str = None
    uuid: UUID
    gamma: float = 1.8
    file: UploadFile


async def save_image(
    image: ImageUpload
):
    """
    Save user-uploaded-image into temporary storage.  

    Args:  
        image (ImageUpload): Uploaded image byte stream.  

    Raises:  
        e: Raies error when failed to save.  

    References:
        - <https://www.tutorialsbuddy.com/python-fastapi-upload-files>
    """
    try:
        logger.info(
            f"Write image file into the temporary storage: {image.img_path = } {image.file = }")
        async with aiofiles.open(image.img_path, 'wb') as fout:
            while content := await image.file.read(1024):
                await fout.write(content)
    except Exception as e:
        raise e


__all__ = [ImageUpload, save_image]
