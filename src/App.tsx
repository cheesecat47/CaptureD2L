import React, { useEffect, useState } from "react";
import { Header } from "./components/header.tsx";
import { Footer } from "./components/footer.tsx";
import sampleBefore from "./assets/sample_before.png";
import sampleAfter from "./assets/sample_after.png";

// ----------------------------------------------------------------
// import jimp: https://github.com/jimp-dev/jimp/issues/1091#issuecomment-1420811585
await import((`jimp/browser/lib/jimp.js`));
const { Jimp } = window as typeof window & { Jimp: any };
// ----------------------------------------------------------------

function App() {
  const [imgBefore, setImgBefore] = useState("");
  const [imgAfter, setImgAfter] = useState("");

  useEffect(() => {
    return () => {
      imgBefore && URL.revokeObjectURL(imgBefore);
      imgAfter && URL.revokeObjectURL(imgAfter);
    };
  }, [imgBefore, imgAfter]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // https://stackoverflow.com/questions/43176560/property-files-does-not-exist-on-type-eventtarget-error-in-typescript
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    setImgBefore(URL.createObjectURL(file));
  };

  const rgb2hsl = (r = 0, g = 0, b = 0) => {
    // convert rgb to hsl
    // https://www.had2know.org/technology/hsl-rgb-color-converter.html
    // https://www.rapidtables.com/convert/color/rgb-to-hsl.html

    (r /= 255), (g /= 255), (b /= 255);
    const M = Math.max(r, g, b),
      m = Math.min(r, g, b);
    const d = M - m;

    const hsl = {
      h: 0,
      s: d == 0 ? 0 : d / (1 - Math.abs(M + m - 1)),
      l: (M + m) / 2,
    };

    if (M == r) {
      hsl.h = 60 * (((g - b) / d) % 6);
    } else if (M == g) {
      hsl.h = 60 * ((b - r) / d + 2);
    } else if (M == b) {
      hsl.h = 60 * ((r - g) / d + 4);
    }

    return hsl;
  };

  const hsl2rgb = (h = 0, s = 0, l = 0) => {
    // convert hsl to rgb
    // https://www.had2know.org/technology/hsl-rgb-color-converter.html
    // https://www.rapidtables.com/convert/color/hsl-to-rgb.html

    const C = (1 - Math.abs(2 * l - 1)) * s;
    const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - C / 2;

    let R = 0,
      G = 0,
      B = 0;
    if (0 <= h && h < 60) {
      (R = C), (G = X);
    } else if (60 <= h && h < 120) {
      (R = X), (G = C);
    } else if (120 <= h && h < 180) {
      (G = C), (B = X);
    } else if (180 <= h && h < 240) {
      (G = X), (B = C);
    } else if (240 <= h && h < 300) {
      (R = X), (B = C);
    } else if (300 <= h && h < 360) {
      (R = C), (B = X);
    }

    return {
      r: Math.trunc((R + m) * 255),
      g: Math.trunc((G + m) * 255),
      b: Math.trunc((B + m) * 255),
    };
  };

  const onSubmit = async () => {
    // onSubmit
    // 1. convert image colour space from rgb to hsl
    // 2. invert l channel (luminosity)
    // 3. revert colour space from hsl to rgb
    // 4. postprocess arguments like brightness, constant, etc.
    // 5. set imgAfter

    if (imgBefore == "") {
      alert("No image");
      return;
    }

    const image = await Jimp.read(imgBefore);

    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      function (_0: number, _1: number, idx: number) {
        // 1. convert rgb to hsl
        const hsl = rgb2hsl(
          image.bitmap.data[idx + 0],
          image.bitmap.data[idx + 1],
          image.bitmap.data[idx + 2]
        );

        // 2. invert l channel
        hsl.l = 1 - hsl.l;

        // 3. revert hsl to rgb
        const rgb = hsl2rgb(hsl.h, hsl.s, hsl.l);

        image.bitmap.data[idx + 0] = rgb.r;
        image.bitmap.data[idx + 1] = rgb.g;
        image.bitmap.data[idx + 2] = rgb.b;
      }
    );

    const buffer = await image.getBufferAsync(Jimp.AUTO);
    const blob = new Blob([buffer]);
    setImgAfter(URL.createObjectURL(blob));
  };

  return (
    <>
      <div className="container mx-auto w-full max-w-full overflow-hidden bg-white dark:bg-slate-700 dark:text-white">
        <Header />
        <div className="mx-auto sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl">
          <form className="my-4 w-full px-4">
            <div className="mb-6 md:flex md:items-center">
              <label
                htmlFor="fileInput"
                className="block pr-4 font-bold md:w-1/3 md:text-right"
              >
                Image:
              </label>
              <input
                id="fileInput"
                type="file"
                onChange={(e) => handleFileUpload(e)}
                className="w-full appearance-none rounded border-2 px-4 py-2 leading-tight md:w-2/3"
              />
            </div>
            <div className="mb-6 md:flex md:items-center">
              <label
                htmlFor="gammaInput"
                className="block pr-4 font-bold md:w-1/3 md:text-right"
              >
                Gamma:
              </label>
              <input
                id="gammaInput"
                type="number"
                step="0.1"
                placeholder="1.8"
                max="5"
                min="0"
                name="gamma"
                className="w-full appearance-none rounded border-2 px-4 py-2 leading-tight md:w-2/3"
              />
            </div>
          </form>
          <div className="my-4 w-full px-4 text-center">
            <button
              className="focus:shadow-outline w-32 rounded bg-gray-400 px-1 py-2 font-bold text-white shadow hover:bg-gray-300"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
          <div
            id="resultBox"
            className="my-10 columns-1 items-center justify-center gap-2 text-center sm:columns-2"
          >
            <img
              src={imgBefore || sampleBefore}
              alt="Before"
              className="w-full"
            />
            <img src={imgAfter || sampleAfter} alt="After" className="w-full" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
