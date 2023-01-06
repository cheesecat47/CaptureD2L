import glob
import os

import cv2
import numpy as np


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


def invert_dark_to_light(
    img_path: str = None,
    out_path: str = './outputs',
    gamma: float = 1.8
) -> str:
    """
    Invert dark mode captured image to light mode image, keeping colour data.  

    Args:  
        img_path (str): path of input(source) image.  
        out_path (str): path of output(destination) image.  
        gamma (float): gamma value for the image. Default is 1.8.  

    Returns:  
        str: path of output(generated) image.  
    """

    if img_path is None:
        return

    os.makedirs(out_path, exist_ok=True)

    basename = os.path.basename(img_path)
    out_path = os.path.join(out_path, basename.replace('.png', '_d2l.png'))
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
    l_new = modify_gamma_channel_l(l_new, gamma)

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
    import sys

    paths = "./samples/*.png"

    try:
        if len(sys.argv) == 2:
            paths = sys.argv[-1]

        sample_list = glob.glob(paths)
        sample_list

        for fpath in sample_list:
            if not os.path.exists(fpath):
                continue
            invert_dark_to_light(fpath)
    except Exception as e:
        print(e)
