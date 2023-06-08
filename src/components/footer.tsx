import React from 'react';

export function Footer() {
    return (
        <>
            <footer className="mx-auto sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl justify-center items-center text-center">
                <div className="mx-auto w-24 columns-3">
                    <div><a href="https://github.com/cheesecat47" target="_blank"><ion-icon name="logo-github"/></a></div>
                    <div><a href="https://www.linkedin.com/in/steven-shin-638413192/" target="_blank"><ion-icon name="logo-linkedin"/></a></div>
                    <div><a href="mailto:cheesecat47@gmail.com" target="_blank"><ion-icon name="mail"/></a></div>
                </div>
                <div>
                    CaptureD2L © 2023. cheesecat47.
                </div>
            </footer>
        </>
    )
}
