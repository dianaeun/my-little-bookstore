import React, { Component } from "react";
import { Form, Button, Nav } from "react-bootstrap";
class Login extends Component {
  state = {
    isLogin: true,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let path = `/Premain`;
    this.props.history.push(path);
  };
  render() {
    return (
      <div
        class="outer-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "cursive",
              fontWeight: "bold",
              color: "#47CDD6",
              marginTop: "45%",
            }}
          >
            My Little Bookstore
          </h2>
          <div style={{ marginTop: "10%" }}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="username"
                  placeholder="User Name or Email"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              {/* <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
              <Button
                type="submit"
                style={{
                  width: "100%",
                  background: "#47CDD6",
                  fontWeight: "bold",
                }}
              >
                LOGIN
              </Button>
            </Form>
            <Nav>
              <Nav.Item>
                <Nav.Link href="/Signup" style={{color:"grey", fontWeight: "bold"}}>Register</Nav.Link>
              </Nav.Item>
              <Nav.Item className="ml-auto" >
                <Nav.Link style={{color:"grey", fontWeight: "bold"}} >Forgot Password</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
