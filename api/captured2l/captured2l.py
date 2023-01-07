import glob
import os

import cv2
import numpy as np
from captured2l.model.image import ImageUpload
from loguru import logger


def modify_gamma_channel_l(
    l: np.ndarray = None,
    gamma: float = 1.8
):
    if l is None:
        return None

    # little lighten
    l_new = l.astype(np.float_)
    l_new = ((l_new/255) ** (1. / gamma)) * 255
    return l_new.astype(np.uint8)


async def invert_dark_to_light(
    image: ImageUpload,
) -> str:
    """
    Invert dark mode captured image to light mode image, keeping colour data.  

    Args:  
        image (ImageUpload): input(source) image.  

    Returns:  
        str: path of output(generated) image.  
    """

    if image.img_path is None:
        return

    try:
        image.out_path = image.img_path.replace('.png', '_d2l.png')
        logger.info(
            f"Convert {image.img_path} to light theme: {image.out_path}")
    except Exception as e:
        logger.exception(
            f"Failed to convert {image.img_path} to light theme: {image.out_path}")
        raise e

    image_bgra = cv2.imread(image.img_path, cv2.IMREAD_UNCHANGED)

    # preserve alpha channel
    alpha = image_bgra[:, :, 3]

    # to make terminal capture image into light mode while keeping the colour data,
    # invert lightness channel in hls color model
    image_hls = cv2.cvtColor(image_bgra, cv2.COLOR_BGR2HLS)
    h, l, s = cv2.split(image_hls)

    # invert L channel
    l_new = 255 - l
    l_new = modify_gamma_channel_l(l_new, image.gamma)

    # merge inverted l channel to make new image
    image_hls_new = cv2.merge([h, l_new, s])
    image_bgra_new = cv2.cvtColor(cv2.cvtColor(image_hls_new, cv2.COLOR_HLS2BGR),
                                  cv2.COLOR_BGR2BGRA)

    # revert alpha channel
    image_bgra_new[:, :, 3] = alpha

    # export new image
    cv2.imwrite(image.out_path, image_bgra_new)

    return image.out_path


if __name__ == "__main__":
    import sys

    paths = "./samples/*.png"

    try:
        if len(sys.argv) == 2:
            paths = sys.argv[-1]

        sample_list = glob.glob(paths)

        for fpath in sample_list:
            if not os.path.exists(fpath):
                continue
            invert_dark_to_light(fpath)
    except Exception as e:
        logger.exception(e)

__all__ = [invert_dark_to_light]
