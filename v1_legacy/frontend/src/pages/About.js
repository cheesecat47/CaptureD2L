import React from "react";
import styles from "./About.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import MyNav from "../components/Navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import captured2l_slide_5 from "../assets/img/captured2l.005.jpeg";
import captured2l_slide_6 from "../assets/img/captured2l.006.jpeg";

const md = `
# Captured terminal image - Dark mode to Light

## 프로젝트 소개

CaptureD2L은 다크 모드에서 캡쳐한 터미널 이미지를 라이트 모드에서 캡쳐한 것처럼 바꿔줍니다.

![captured2l how to image](${captured2l_slide_6})

더 자세한 설명은 [블로그](https://velog.io/@cheesecat47/CaptureD2L-프로젝트-소개)에서 확인하실 수 있습니다.

## 사용 방법

![captured2l how to image](${captured2l_slide_5})

<div class="video-container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/rR4T72k3f3c" title="YouTube video player" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
</div>
`;

const About = () => {
  return (
    <div>
      <MyNav />
      <Container className={styles.About}>
        <Row className="about-article">
          <ReactMarkdown
            children={md}
            components={{
              img: ({ node, ...props }) => (
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "75vh",
                    border: "solid 1px #00000011",
                  }}
                  {...props}
                  alt=""
                />
              ),
            }}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          />
        </Row>
      </Container>
    </div>
  );
};

export default About;
