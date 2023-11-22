import Nav from "react-bootstrap/Nav";
import Popup from "reactjs-popup";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Login from "./loginsignup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const [login, setLogin] = useState("Login/SignUp");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch login status when the component mounts
    axios
      .post("http://localhost:4000/check") // Update the URL to localhost:4000
      .then((response) => {
        console.log(response.data);
        setLogin(response.data);
      })
      .catch((error) => {
        console.error("Error fetching login status:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleLogin = () => {
    if (login === "Login/SignUp") {
      // If not logged in, open the login popup
      return (
        <Popup trigger={<Nav.Link eventKey="link-3">{login}</Nav.Link>} modal nested closeOnDocumentClick>
          <div>
            {/* Pass the navigate function to the Login component */}
            <Login navigate={navigate} />
          </div>
        </Popup>
      );
    } else {
      // If logged in, navigate to the dashboard
      return (
        <Nav.Link eventKey="link-3" onClick={() => navigate("/dashboard")}>
          {login}
        </Nav.Link>
      );
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Nav className="justify-content-center" activeKey="/home">
              <Nav.Item>
                <Nav.Link href="/movies">Movies</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Stream</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">Event</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-3">Plays</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <Nav className="justify-content-center" activeKey="/home">
              <Nav.Item>
                <Nav.Link href="/home">List Your Shows</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Gift Card</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">Offers</Nav.Link>
              </Nav.Item>

              {/* Use the handleLogin function to conditionally render login link or user's name */}
              {handleLogin()}
            </Nav>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Navigation;
