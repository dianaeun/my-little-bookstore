import React, { Component } from "react";
import { Form, Button, Col, Row, Nav, Card} from "react-bootstrap";
import MlbNavbar from '../components/NavigationBar.js'
import AuthContext from '../context/AuthContext';

const thumbs = require("../icons/thumbs.png");

class Signup extends Component {
  state = {
    createdAccount: false,
  };
  
  static contextType = AuthContext;
  constructor(props){
    super(props);
    this.emailPreRef = React.createRef();
    this.emailPostRef = React.createRef();
    this.passwordRef = React.createRef();
  }
  handleSubmit = event => {
    event.preventDefault();
    const emailPre = this.emailPreRef.current.value;
    const emailPost = this.emailPostRef.current.value;
    const password = this.passwordRef.current.value;
    if (emailPre.trim().length === 0 || password.trim().length === 0 || emailPost.trim().length === 0){
      console.log("warning modal (null type input)");
      return;
    }
    const email = emailPre + "@" + emailPost
    const requestBody = {
      query: `
            mutation CreateUser($email: String!, $password: String!){
              createUser(userInput: {email: $email, password: $password}) {
                  _id
                  email
              }
            }
        `,
        variables: {
            email: email,
            password: password
        }
    };
    fetch("http://localhost:8000/graphql", {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
    .then(res => {
      console.log(res.status);
      if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed to fetch during Login!!!!');
      }
      return res.json();
    })
    .then(resData => {
      console.log("successful create your account!", resData);
      this.setState({createdAccount: true});
    })
    .catch(err =>{
      console.log('Modal, (Please check your ID or password)', err);
      //throw err;    => user 가 이미 존재할때 그냥 error 을 throw 시켜버릴때 먹통이된다! 
    });
  }
  render() {
    return (
        <div class="outer-container">
          <MlbNavbar/>
            {this.state.createdAccount ? 
              <Card className="text-center" style={{paddingTop: "3rem"}}> 
                <Card.Body>
                    <Card.Title><h3 style={{fontWeight: "bold", fontStyle: "italic" }}>Successfully Created your Account!</h3></Card.Title>
                    <Card.Img src={thumbs} style={{ width: "17rem", padding: "2rem"}}/>
                    <Nav style={{marginLeft: "47rem"}}>
                        <Nav.Item>
                          <Nav.Link href="/Login" style={{color:"#2E7384", fontWeight: "bold", fontSize: '1.5rem'}}>Let's go to Login!!!!!!</Nav.Link>
                        </Nav.Item>
                    </Nav>  
                        
                </Card.Body>
              </Card>  
            : 
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
                        <Form.Control type="userID"/>
                      </Col>
                      <Button 
                        size="sm"
                        style={{background: "#22525F", border: "0px", paddingLeft: "20px", paddingRight: "20px"}}
                      >
                        VERIFY
                      </Button>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" as={Row}>
                      <Form.Label column sm={1} style={{fontWeight: "bold"}} > Password </Form.Label>
                      <Col sm={3}>
                        <Form.Control type="password" ref={this.passwordRef}/>
                      </Col>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" as={Row}>
                      <Form.Label column sm={1} style={{fontWeight: "bold"}} > Email </Form.Label>
                      <Col sm={2}>
                        <Form.Control type="email1" ref={this.emailPreRef} />
                      </Col>
                      @
                      <Col sm={2}>
                        <Form.Control type="email2" ref={this.emailPostRef} />
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
            }
            
        </div>
    );
  }
}

export default Signup;
