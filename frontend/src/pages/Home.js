import React, { Component } from 'react';
import axios from 'axios';
import MyNav from '../components/Navigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import sample_before from '../assets/img/sample_before.png';
import sample_after from '../assets/img/sample_after.png';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectFile: null,
            imgBefore: null,
            imgAfter: null,
        }
    }

    handleFileInput(e) {
        this.setState({
            selectFile: e.target.files[0],
            imgBefore: URL.createObjectURL(e.target.files[0]),
            imgAfter: Object()
        })
    }

    async handlePost() {
        axios.postForm("/api/invert", {
            "file": this.state.selectFile
        }, {
            responseType: 'blob'
        }).then((res) => {
            console.log('success: ', res);
            if (res.data) {
                // https://webcorgi.tistory.com/40
                this.setState({
                    imgAfter: URL.createObjectURL(new Blob([res.data], {
                        type: res.headers['content-type']
                    })) // bytestream으로 들어옴. 핸들링 필요.
                })
            }
        }).catch((err) => {
            alert('failed: ' + err);
        })
    }

    render() {
        return (
            <>
                <MyNav />
                <Container>
                    <Row>
                        <Stack>
                            <input type="file" name="file" onChange={e => this.handleFileInput(e)} />
                            <input type="text" name="gamma" />
                            <Button type="submit" onClick={() => this.handlePost()}>Invert Dark mode to Light!</Button>
                        </Stack>
                    </Row>
                    <Row>
                        <Col md={6} id="img_before">
                            <Image src={this.state.imgBefore || sample_before} alt="preview-img" fluid />
                        </Col>
                        <Col md={6} id="img_after">
                            <Image src={this.state.imgAfter || sample_after} alt="preview-img" fluid />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    };
};

export default Home;