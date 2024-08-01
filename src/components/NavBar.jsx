import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { CartWidget } from "./CartWidget";

export const NavBar = () => (
<>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">WIMI PASTELERIA ARTESANAL</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as= {NavLink} to="/categoria/alfajor">Alfajores</Nav.Link>
            <Nav.Link as= {NavLink} to="/categoria/conito">Conitos</Nav.Link>
            <Nav.Link as= {NavLink} to="/categoria/cookies">Cookies</Nav.Link>
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
</>
);
