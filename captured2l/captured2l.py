import gc
import glob
import os
from math import log

import cv2
import matplotlib.pyplot as plt
import numpy as np


def invert_dark_to_light(img_path: str) -> str:
    """
    Invert dark mode captured image to light mode image, keeping colour data.

    Args:
        img_path (str): path of input(source) image.

    Returns:
        str: path of output(generated) image.
    """
    basename = os.path.basename(img_path)
    out_path = os.path.join('./outputs', basename.replace('.png', '_d2l.png'))
    print(f"Convert {basename} to light theme: {out_path}")

    image_bgra = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)

    # preserve alpha channel
    alpha = image_bgra[:, :, 3]

    # to make terminal capture image into light mode while keeping the colour data,
    # invert lightness channel in hls color model
    image_hls = cv2.cvtColor(image_bgra, cv2.COLOR_BGR2HLS)
    h, l, s = cv2.split(image_hls)

    # invert L channel
    l_new = 255 - l

    # little lighten
    gamma = 1.8
    inv_gamma = 1. / gamma

    l_new = l_new.astype(np.float_)
    l_new = ((l_new/255) ** inv_gamma) * 255
    l_new = l_new.astype(np.uint8)

    # merge inverted l channel to make new image
    image_hls_new = cv2.merge([h, l_new, s])
    image_bgra_new = cv2.cvtColor(cv2.cvtColor(
        image_hls_new, cv2.COLOR_HLS2BGR), cv2.COLOR_BGR2BGRA)

    # revert alpha channel
    image_bgra_new[:, :, 3] = alpha

    # export new image
    cv2.imwrite(out_path, image_bgra_new)

    return out_path


if __name__ == "__main__":
    sample_list = glob.glob("./samples/*.png")
    sample_list

    for fpath in sample_list:
        if not os.path.exists(fpath):
            continue
        invert_dark_to_light(fpath)
