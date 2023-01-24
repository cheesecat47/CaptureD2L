import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const MyFooter = () => {
    return (
        <Container fluid>
            <footer>
                <Row>
                    <Col>
                        Capture D2L
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <a href={process.env.REACT_APP_GITHUB_URL}><FontAwesomeIcon icon={faGithub} /></a>
                        <a href={process.env.REACT_APP_LINKEDIN_URL}><FontAwesomeIcon icon={faLinkedin} /></a>
                        <a href={process.env.REACT_APP_MAIL_ACCOUNT}><FontAwesomeIcon icon={faEnvelope} /></a>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Copyright 2023. cheesecat47.
                    </Col>
                </Row>
            </footer>
        </Container>
    );
};

export default MyFooter;