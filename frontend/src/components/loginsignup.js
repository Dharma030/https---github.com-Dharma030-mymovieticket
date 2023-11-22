import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [afterlogin, setafterlogin] = useState("");

  function username1(e) {
    setusername(e.target.value);
  }

  function password1(e) {
    setpassword(e.target.value);
  }

  function submit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        setafterlogin(response.data.message); // Update based on your server response
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setafterlogin("Login failed. Please try again."); // or some other error message
      });
  }

  return (
    <Form
      onSubmit={submit}
      style={{
        width: "700px",
        margin: "auto auto",
        backgroundColor: "black",
        padding: "50px 50px 50px 50px",
        borderRadius: "10px",
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={username1}
          type="text" // Update this line
          placeholder="Enter Username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={password1}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>

      <Link to="/signup">
        <Button style={{ marginLeft: "10px" }} variant="secondary">
          SignUp
        </Button>
      </Link>
      <div>{afterlogin}</div>
    </Form>
  );
}
