import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNumberChange = (e) => setNumber(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/user", {
        name,
        password,
        email,
        city,
        number,
        username,
      })
      .then((response) => {
        console.log(response.data);
        // You may want to handle success (e.g., redirect to login page)
        let path = `/`; // Redirect to the desired path after successful signup
        navigate(path);
      })
      .catch((error) => {
        console.error("Error during sign-up:", error);
        // Handle error, show user-friendly message, etc.
      });
  };

  return (
    <Form onSubmit={handleSubmit} style={{ margin: "200px 200px 200px 200px" }}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleEmailChange}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handlePasswordChange}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
      </Row>

      <Col xs="auto">
        <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
          Username
        </Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text>@</InputGroup.Text>
          <Form.Control
            onChange={handleUsernameChange}
            value={username}
            id="inlineFormInputGroup"
            placeholder="Username"
          />
        </InputGroup>
      </Col>

      <Form.Group className="mb-3" controlId="formGridName">
        <Form.Label>Name</Form.Label>
        <Form.Control onChange={handleNameChange} value={name} placeholder="Enter your name..." />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control onChange={handleCityChange} value={city} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control onChange={handleNumberChange} value={number} />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
