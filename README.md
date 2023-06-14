# CaptureD2L

[![github pages](https://github.com/cheesecat47/CaptureD2L/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/cheesecat47/CaptureD2L/actions/workflows/gh-pages.yml)

CaptureD2L is a web page for invert terminal image from dark mode to light.

## Installation

### Requirements

- Node.js v18

### Run

```bash
$ npm install
$ npm run dev
```

Go to <http://localhost:5173/CaptureD2L/>

## Docs

- [Project Introduction](https://cheesecat47.github.io/posts/2023-02-11-introduce-cd2l/2023-02-11-introduce-cd2l/)
- [Blog posts(in Korean)](https://cheesecat47.github.io/tags/captured-2-l/)
- Image Processing
  - [v1](./captured2l.md)
  - [v2](https://cheesecat47.github.io/posts/2023-06-07/cd2l-rgb-to-hsl/)

## Release Notes

### v 2.1.0.

- 이미지 밝기 반전 방법을 변경하였습니다.

### v 2.0.0.

- 기존에는 이미지 처리를 위해 Python API 서버를 따로 두었으나, 이번 버전에서는 [Jimp](https://github.com/jimp-dev/jimp) 라이브러리를 사용해 React Frontend에서
  모든 처리가 가능하도록 변경했습니다.
  - <https://cheesecat47.github.io/posts/2023-06-04/cd2l-v2/>

## Maintainers

[@cheesecat47](https://github.com/cheesecat47): cheesecat47@gmail.com
