import { IonIcon } from '@ionic/react'

export function Footer() {
  return (
    <>
      <footer className="mx-auto items-center justify-center text-center sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl">
        <div className="mx-auto w-24 columns-3">
          <div>
            <a href="https://github.com/cheesecat47" target="_blank">
              <IonIcon name="logo-github" />
            </a>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/steven-shin-638413192/" target="_blank">
              <IonIcon name="logo-linkedin" />
            </a>
          </div>
          <div>
            <a href="mailto:cheesecat47@gmail.com" target="_blank">
              <IonIcon name="mail" />
            </a>
          </div>
        </div>
        <div>CaptureD2L ver.2.1.1. © 2023. cheesecat47.</div>
      </footer>
    </>
  )
}
