import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import LoginModal from "./LoginModal";
import logo from "./images/monkeyLogo.jpg";
import "./header.css";

const Header: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img
            alt="Logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">{/* Add any additional links here */}</Nav>
          <Button
            variant="outline-secondary"
            onClick={handleLoginShow}
            className="login-button">
            Login
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <LoginModal show={showLogin} handleClose={handleLoginClose} />
    </>
  );
};

export default Header;
