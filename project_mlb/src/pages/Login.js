import React, { Component } from "react";
import { Form, Button, Nav, Card } from "react-bootstrap";
import AuthContext from '../context/AuthContext';
import MlbNavbar from '../components/NavigationBar.js'
import {Redirect} from "react-router";
import { Link, NavLink} from "react-router-dom";

class Login extends Component {
  state = {
    isLogin: true,
  };
  static contextType = AuthContext;
  render() {
    return (
        <div class="outer-container">
          <MlbNavbar/>
            <Card style={{width: "40%", marginLeft: "30%", marginTop: "4rem"}}>
              <Card.Body>
              <Card.Title style={{marginBottom: "2rem", fontWeight: "bold", fontStyle: "italic", fontSize: "2rem"}}> Login to Your Account </Card.Title>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formBasicUserID">
                    <Form.Label style={{fontWeight: "bold"}}>UserID / Email</Form.Label>
                    <Form.Control type="userID"/>
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label style={{fontWeight: "bold"}}>Password</Form.Label>
                    <Form.Control type="password"/>
                  </Form.Group>
                  <Button
                    style={{width: "100%", background: "#22525F", border: 0, fontWeight: "bold", marginTop: "1.5rem", padding: "0.6rem", float: "left"}}
                    onClick={this.context.login}
                  >
                    LOGIN
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer style={{background: "white"}}>
                <Nav >
                  <Nav.Item>
                    <Nav.Link href="/Signup" style={{color:"black", fontWeight: "bold"}}>Create Account</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="ml-auto">
                    <Nav.Link style={{color:"black", fontWeight: "bold"}}>Forgot Password</Nav.Link>
                  </Nav.Item>
                </Nav>                    
              </Card.Footer>
                               
            </Card>
        </div>
    );
  }
}

export default Login;
