import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// ----------------------------------------------------------------
// import jimp: https://github.com/jimp-dev/jimp/issues/1091#issuecomment-1420811585
// @ts-ignore
await import("jimp/browser/lib/jimp.js");
const {Jimp} = window as typeof window & { Jimp: any };

// ----------------------------------------------------------------

function App() {
    const [count, setCount] = useState(0)
    const [file, setFile] = useState();
    const [imgBefore, setImgBefore] = useState("");
    const [imgAfter, setImgAfter] = useState("");

    useEffect(() => {
        return () => {
            imgBefore && URL.revokeObjectURL(imgBefore);
            imgAfter && URL.revokeObjectURL(imgAfter);
        };
    }, []);

    const handleFileUpload = (e) => {
        console.log(e);
        setFile(e.target.files[0]);
        setImgBefore(URL.createObjectURL(e.target.files[0]));
    };

    const onSubmit = async () => {
        // onSubmit
        // 1. change image colour space from rgb to hsl
        // 2. invert l channel (luminosity)
        // 3. revert colour space from hsl to rgb
        // 4. postprocess arguments like brightness, constant, etc.
        // 5. set imgAfter

        if (imgBefore == "") {
            alert("No image");
            return;
        }

        Jimp.read(imgBefore).then((image) => {
            console.log(image);
            image.invert().getBufferAsync(Jimp.AUTO).then((buffer) => {
                console.log(buffer);
                const blob = new Blob([buffer]);
                console.log('blob', blob);
                setImgAfter(URL.createObjectURL(blob));
                console.log("setImgAfter");
            }).catch((err: Error) => {
                console.error(err);
            });
        }).catch((err: Error) => {
            console.error(err);
        });
    };

    return (
        <>
            <div>
                <form>
                    <input type="file" onChange={e => handleFileUpload(e)}/>
                    <input type="number" step="0.1" placeholder="1.8" max="5" min="0" name="gamma"/>
                </form>
                <div>
                    <button onClick={onSubmit}>Submit</button>
                </div>
                <div>
                    {imgBefore ? <img src={imgBefore} alt="hello" width="300px"/> : <p>Before</p>}
                    {imgAfter ? <img src={imgAfter || ""} alt="hello" width="300px"/> : <p>After</p>}
                </div>
            </div>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
