import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const MyNav = () => {
    const activeStyle = {
        color: 'red',
        fontSize: '2rem'
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link exact to="/" activeStyle={activeStyle}>Home</Nav.Link>
                        <Nav.Link to="/about" activeStyle={activeStyle}>About</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href={process.env.REACT_APP_GITHUB_URL}>Github</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNav;