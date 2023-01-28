import React from 'react';
import Container from 'react-bootstrap/Container';
import MyNav from '../components/Navigation';

const About = () => {
    return (
        <div>
            <MyNav />
            <Container>
                <h1>About</h1>
            </Container>
        </div>
    );
};

export default About;