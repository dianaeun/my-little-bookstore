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
            <Card style={{width: "40%", marginLeft: "30%", marginTop: "4rem", border: "1px solid #22525F"}}>
              <Card.Body>
              <Card.Title style={{marginBottom: "2rem", fontFamily: "fantasy", fontSize: "2rem"}}> Login to Your Account </Card.Title>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formBasicUserID">
                    <Form.Label style={{fontWeight: "bold"}}>UserID / Email</Form.Label>
                    <Form.Control type="userID" style={{background: "#EFEFEF"}}/>
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label style={{fontWeight: "bold"}}>Password</Form.Label>
                    <Form.Control type="password" style={{background: "#EFEFEF"}}/>
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
                    <Nav.Link href="/Signup" style={{color:"#2252FA", fontWeight: "bold"}}>Create Account</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="ml-auto">
                    <Nav.Link style={{color:"#2252FA", fontWeight: "bold"}}>Forgot Password</Nav.Link>
                  </Nav.Item>
                </Nav>                    
              </Card.Footer>
                               
            </Card>
        </div>
    );
  }
}

export default Login;
