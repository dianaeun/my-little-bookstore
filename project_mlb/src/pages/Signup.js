import React, { Component } from "react";
import { Form, Button, Col, Row, Nav } from "react-bootstrap";
import MlbNavbar from '../components/NavigationBar.js'

class Signup extends Component {
    state = {
        isLogin: true,
      };
    handleSubmit = (e) => {
      e.preventDefault();
      let path = `/Login`;
      this.props.history.push(path);
    };
  render() {
    return (
        <div class="outer-container">
          <MlbNavbar/>
          <div style={{ paddingLeft: "10%", paddingTop: "5%" }}>
            <h3 style={{ marginBottom: "30px", fontWeight: "bold", fontStyle: "italic" }}>CREATE ACCOUNT</h3>
            <Form onSubmit={this.handleSubmit} style={{ width: "100%" }}>
              <Form.Group controlId="formBasicName" as={Row}>
                <Form.Label column sm={1} style={{fontWeight: "bold"}}> First Name </Form.Label>
                <Col sm={2}>
                  <Form.Control type="firstName" />
                </Col>
                <Form.Label column sm={1} style={{fontWeight: "bold"}}> Last Name </Form.Label>
                <Col sm={2}>
                  <Form.Control type="lastName" />
                </Col>
              </Form.Group>
              <Form.Group controlId="formBasicuserID" as={Row}>
                <Form.Label column sm={1} style={{fontWeight: "bold"}}> userID </Form.Label>
                <Col sm={3}>
                  <Form.Control type="userID" />
                </Col>
                <Button 
                  size="sm"
                  style={{background: "#22525F", border: "0px", paddingLeft: "20px", paddingRight: "20px"}}
                >
                  VERIFY
                </Button>
              </Form.Group>
              <Form.Group controlId="formBasicPassword" as={Row}>
                <Form.Label column sm={1} style={{fontWeight: "bold"}}> Password </Form.Label>
                <Col sm={3}>
                  <Form.Control type="password" />
                </Col>
              </Form.Group>
              <Form.Group controlId="formBasicEmail" as={Row}>
                <Form.Label column sm={1} style={{fontWeight: "bold"}}> Email </Form.Label>
                <Col sm={2}>
                  <Form.Control type="email1" />
                </Col>
                @
                <Col sm={2}>
                  <Form.Control type="email2" />
                </Col>
              </Form.Group>
              <Form.Group controlId="formBasicLocation" as={Row}>
                <Form.Label column sm={1} style={{fontWeight: "bold"}}> Location </Form.Label>
                <Col sm={2}>
                  <Form.Control type="location" />
                </Col>
              </Form.Group>
              <Form.Group controlId="formBasicGenre" as={Row}>
                <Form.Label column sm={1} style={{fontWeight: "bold"}}> Preferred Genre </Form.Label>
              <Col key={`inline-checkbox`} className="mb-3" style={{paddingTop: "1rem"}}>
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
              <div style={{display: "flex"}}>
              <Button type="submit" style={{background: "#22525F", border: "0px"}}>SUBMIT</Button>
              <Nav>
                <Nav.Item>
                  <Nav.Link href="/Login" style={{color:"black", fontWeight: "bold", marginLeft: "20px"}}>Already have an account? (Login)</Nav.Link>
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
