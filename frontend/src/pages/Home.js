import React, { Component } from 'react';
import axios from 'axios';
import MyNav from '../components/Navigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form';
import sample_before from '../assets/img/sample_before.png';
import sample_after from '../assets/img/sample_after.png';

class Home extends Component {

    constructor(props) {
        super(props);
        this.gammaValueRef = React.createRef();
        this.state = {
            selectFile: null,
            imgBefore: null,
            imgAfter: null,
            filename: null,
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
        // Default gamma value = 1.8. 
        // Higher gamma value makes the result image brighter
        let gamma = 1.8;
        if (this.gammaValueRef.current.value) {
            try {
                gamma = parseFloat(this.gammaValueRef.current.value);
            } catch (e) {
                console.error(e);
            }
        }

        axios.postForm("/api/invert", {
            "file": this.state.selectFile,
            "gamma": gamma
        }, {
            responseType: 'blob'
        }).then((res) => {
            let filename = res.headers['content-disposition'].split('filename=')[1].replace(/"/g, '');
            console.log('success: ', res, 'filename:', filename);

            if (res.data) {
                // https://webcorgi.tistory.com/40
                const objectURL = URL.createObjectURL(new File([res.data], filename, {
                    type: res.headers['content-type'],
                }));
                this.setState({
                    imgAfter: objectURL,
                    filename: filename,
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
                    <Row className='justify-content-center'>
                        <Col sm={9}>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" name="file" onChange={e => this.handleFileInput(e)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Gamma</Form.Label>
                                    <Form.Control type="number" step="0.1" placeholder="1.8" max="5" min="0" name="gamma" ref={this.gammaValueRef} />
                                </Form.Group>
                                <Button type="button" onClick={() => this.handlePost()}>Invert Dark mode to Light!</Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} id="img_before">
                            <Image src={this.state.imgBefore || sample_before} alt="preview-img" fluid />
                        </Col>
                        <Col md={6} id="img_after">
                            <a href={this.state.imgAfter || "#"} download={this.state.filename || null} className='w-100 h-100'>
                                <Image src={this.state.imgAfter || sample_after} alt="preview-img" fluid />
                            </a>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    };
};

export default Home;