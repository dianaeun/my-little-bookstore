import React, { Component } from "react";
import { Form, Button, Col, Row, Nav } from "react-bootstrap";
class Signup extends Component {
    state = {
        isLogin: true,
      };
      handleSubmit = (e) => {
        e.preventDefault();
        let path = `/`;
        this.props.history.push(path);
      };
  render() {
    return (
      <div class="outer-container">
        <div style={{ textAlign: "center", background: "#56a2b5" }}>
          <h1
            style={{
              color: "white",
              padding: "25px",
              fontFamily: "fantasy",
              fontWeight: "bold",
            }}
          >
            My Little Bookstore
          </h1>
        </div>
        <div style={{ paddingLeft: "10%", paddingTop: "5%" }}>
          <h3 style={{ marginBottom: "30px", fontWeight: "bold" }}>CREATE ACCOUNT</h3>
          <Form onSubmit={this.handleSubmit} style={{ width: "100%" }}>
            <Form.Group controlId="formBasicUsername" as={Row}>
              <Form.Label column sm={2}>
                Username
              </Form.Label>
              <Col sm={3}>
                <Form.Control type="username" />
              </Col>
              <Button
                size="sm"
                style={{
                  background: "#47CDD6",
                  color: "white",
                  border: "0px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                Verify
              </Button>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" as={Row}>
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={3}>
                <Form.Control type="password" />
              </Col>
            </Form.Group>
            <Form.Group controlId="formBasicEmail" as={Row}>
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={2}>
                <Form.Control type="email1" />
              </Col>
              @
              <Col sm={2}>
                <Form.Control type="email2" />
              </Col>
            </Form.Group>
            <Form.Group controlId="formBasicLocation" as={Row}>
              <Form.Label column sm={2}>
                Location
              </Form.Label>
              <Col sm={2}>
                <Form.Control type="location" />
              </Col>
            </Form.Group>
            <Form.Group controlId="formBasicGenre" as={Row}>
              <Form.Label column sm={2}>
                Preferred Genre
              </Form.Label>
            <Col key={`inline-checkbox`} className="mb-3">
              <Form.Check
                inline
                label="Romance"
                id={`inline-checkbox-1`}
              />
              <Form.Check
                inline
                label="Horror"
                id={`inline-checkbox-2`}
              />
              <Form.Check
                inline
                label="Fantasy"
                id={`inline-checkbox-3`}
              />
              <Form.Check
                inline
                label="Adventure"
                id={`inline-checkbox-4`}
              />
              <Form.Check
                inline
                label="Science"
                id={`inline-checkbox-5`}
              />
            </Col>
            </Form.Group>
            <div style={{display: "flex", paddingLeft: "20px"}}>
            <Button type="submit" style={{background: "#0D4B78", color: "white"}}>SUBMIT</Button>
            <Nav>
              <Nav.Item>
                <Nav.Link href="/" style={{color:"black", fontWeight: "bold", marginLeft: "20px"}}>Already have an account? (Login)</Nav.Link>
              </Nav.Item>
            </Nav>                
            </div>

          </Form>
        </div>
      </div>
    );
  }
}

export default Signup;
