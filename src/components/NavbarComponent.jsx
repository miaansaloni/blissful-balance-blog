import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { PersonCircle } from "react-bootstrap-icons";

function NavbarComponent() {
  return (
    <Navbar expand="lg">
      <Container id="nav-container">
        <Navbar.Brand href="/" id="blog-title">
          Blog Name
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="navlinks">
              Home
            </Nav.Link>
            <Nav.Link href="about" className="navlinks">
              About
            </Nav.Link>
            <Nav.Link href="contact" className="navlinks">
              Contact us
            </Nav.Link>
            {/* <Nav.Link href="login">Log in</Nav.Link> */}
          </Nav>
          <Nav.Link href="profile">
            <PersonCircle size={30} id="profile-icon" />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
