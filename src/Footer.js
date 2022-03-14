import React from "react";
import './App';
import './App.css';
import { Container, Nav, } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
    <Container fluid>
      <Nav>
        <p className='footercontent'>
         Created using Spotify API and React
        </p>
      </Nav>
      <div className="copyright">
        © {new Date().getFullYear()} made by Laura Mooney
      </div>
    </Container>
  </footer>
  );
}

export default Footer;