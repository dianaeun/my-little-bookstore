import React, { Component } from "react";
import { Form, Button, Nav, Card } from "react-bootstrap";
import AuthContext from '../context/AuthContext';
import MlbNavbar from '../components/NavigationBar';
import AuthWarningModal from '../components/AuthWarningModal';

class Login extends Component {
  state ={
    authWarning: false
  }
  static contextType = AuthContext;
  constructor(props){
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }
  handleClose = () => {
    this.setState({authWarning: false});
  }
  handleSubmit = event => {
    event.preventDefault();
    const email = this.emailRef.current.value;
    const password = this.passwordRef.current.value;
    if (email.trim().length === 0 || password.trim().length === 0){
      this.setState({authWarning: true});
      return;
    }
    const requestBody = {
      query: `
            query Login($email: String!, $password: String!) {
                login(email: $email, password: $password){
                    email
                    firstName
                    preferredGenres
                    userID
                    token
                    tokenExpiration
                    user_id
                }
            }
        `,
        variables: {
            email: email,
            password: password
        }
    };
    fetch("https://my-little-bookstore.herokuapp.com/graphql", {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
    .then(res => {
      console.log(res.status);
      if (res.status !== 200 && res.status !== 201) {
          console.log("res message:", res);
          throw new Error('Failed to fetch during Login!!!!');
      }
      return res.json();
    })
    .then(resData => {
      console.log("successful login!", resData);
      if (resData.data.login.token) {
          this.context.login(resData.data.login.token, resData.data.login.firstName, resData.data.login.preferredGenres, resData.data.login.email, resData.data.login.userID, resData.data.login.user_id, resData.data.login.tokenExpiration)
      }})
    .catch(err =>{
      this.setState({authWarning: true})
      console.log('Modal, (Please check your ID or password)', err);
      //throw err;    => user 가 존재하지 않을때 그냥 error 을 throw 시켜버릴때 먹통이된다! 
    });
  }



  render() {
    return (
        <React.Fragment>
          <AuthWarningModal show={this.state.authWarning} handleClose={this.handleClose}/>
          <div class="outer-container">
            <MlbNavbar/>
              <Card style={{width: "40%", marginLeft: "30%", marginTop: "4rem", border: "1px solid #22525F"}}>
                <Card.Body>
                <Card.Title style={{marginBottom: "2rem", fontFamily: "fantasy", fontSize: "2rem"}}> Login to Your Account </Card.Title>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicUserID">
                      <Form.Label style={{fontWeight: "bold"}}>UserID / Email</Form.Label>
                      <Form.Control type="text" style={{background: "#EFEFEF"}} ref={this.emailRef}/>
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label style={{fontWeight: "bold"}}>Password</Form.Label>
                      <Form.Control type="password" style={{background: "#EFEFEF"}} ref={this.passwordRef}/>
                    </Form.Group>
                    <Button
                      style={{width: "100%", background: "#22525F", border: 0, fontWeight: "bold", marginTop: "1.5rem", padding: "0.6rem", float: "left"}}
                      type='submit'
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
        </React.Fragment>
        
    );
  }
}

export default Login;
