import React, { Component } from "react";
import { Form, Button, Col, Row, Nav, Card} from "react-bootstrap";
import MlbNavbar from '../components/NavigationBar.js'
import AuthContext from '../context/AuthContext';

const thumbs = require("../icons/thumbs.png");
export const validatePassword = (password) => {
    if(password.length < 6 || !password.match(/[0-9]/g) ||
        !password.match(/[a-z]/g) || !password.match(/[A-Z]/g)){
      return false;
    }
    return true;
}

export const validateInputFields = (firstName, lastName, emailPre, password, emailPost, userID, phoneNum1, phoneNum2, phoneNum3, location) => {
  if (firstName.trim().length === 0 || lastName.trim().length === 0 || emailPre.trim().length === 0 || password.trim().length === 0 || emailPost.trim().length === 0 || userID.trim().length === 0 ||
        phoneNum1.trim().length === 0 || phoneNum2.trim().length === 0 || phoneNum3.trim().length === 0 || location.trim().length === 0){
    return false;
  }
  return true;
}

class Signup extends Component {
  state = {
    createdAccount: false,
    genres: [],
    passwordWarning: false,
    inputWarning: false
  };
  
  static contextType = AuthContext;
  constructor(props){
    super(props);
    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.emailPreRef = React.createRef();
    this.emailPostRef = React.createRef();
    this.passwordRef = React.createRef();
    this.userIDRef = React.createRef();
    this.locationRef = React.createRef();
    this.phone1Ref = React.createRef();
    this.phone2Ref = React.createRef();
    this.phone3Ref = React.createRef();
    // this.preferredGenresRef = React.createRef();
  }
  handleCheckBoxes = target => {
    const genres = this.state.genres;
    if (genres.indexOf(target) === -1)
      genres.push(target);
    else
      genres.splice(genres.indexOf(target), 1);
    this.setState({genres: genres});
  }
  handleVerify = () => {
    const requestBody = {
      query: `
          query{
              findByUserID(userID: "${this.userIDRef.current.value}"){
                  userID
              }
          }
      `
    }
    fetch('/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to fetch User")
        }
        return res.json()
    })
    .then(resData => {
      console.log("User successfully fetched! ", resData);
      const user = resData.data.findByUserID;
      if(user){
        alert("Sorry, userID already in use");
      }
      else{
        alert("Great! Unique userID");
      }});
  }
  handleSubmit = event => {
    event.preventDefault();
    const firstName = this.firstNameRef.current.value;
    const lastName = this.lastNameRef.current.value;
    const emailPre = this.emailPreRef.current.value;
    const emailPost = this.emailPostRef.current.value;
    const password = this.passwordRef.current.value;
    const userID = this.userIDRef.current.value;
    const location = this.locationRef.current.value;
    const phoneNum1 = this.phone1Ref.current.value;
    const phoneNum2 = this.phone2Ref.current.value;
    const phoneNum3 = this.phone3Ref.current.value;
    const preferredGenres = this.state.genres;

    if (!validateInputFields(firstName, lastName, emailPre, password, emailPost, userID, phoneNum1, phoneNum2, phoneNum3, location)){
      alert("Please complete!");
      this.setState({inputWarning: true})
      return;
    }
    if (preferredGenres.length === 0){
      alert("Please choose at least 1 genre!");
      return;
    }
    
    if (!validatePassword(password)){
      this.setState({passwordWarning: true})
      return;
    }
    else{
      this.setState({passwordWarning: false})
    }
   
    const email = emailPre + "@" + emailPost;
    const phoneNumber = phoneNum1 + '-' + phoneNum2 + '-' + phoneNum3;
    const requestBody = {
      query: `
            mutation CreateUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $userID: String!, $location: String, $preferredGenres: [String]!, $phoneNumber: String){
              createUser(userInput: {firstName: $firstName, lastName: $lastName, email: $email, password: $password, userID: $userID, location: $location, preferredGenres: $preferredGenres, phoneNumber: $phoneNumber}) {
                  _id
                  firstName
                  lastName
                  email
                  userID
                  location
                  preferredGenres
                  phoneNumber
              }
            }
        `,
        variables: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            userID: userID,
            location: location,
            preferredGenres: preferredGenres,
            phoneNumber: phoneNumber
        }
    };
    fetch("/graphql", {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
    .then(res => {
      console.log(res.status);
      if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed to fetch during Login!!!!');
      }
      return res.json();
    })
    .then(resData => {
      if (resData.errors){
        alert("Duplicated User!");
      }
      else{
        console.log("successful create your account!", resData);
        this.setState({createdAccount: true});        
      }
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
                <Form onSubmit={this.handleSubmit} style={{ width: "fit-content" }}>
                    <Form.Group controlId="formBasicPassword" as={Row}>
                      <Form.Label column sm={2} style={{fontWeight: "bold"}} > First Name </Form.Label>
                      <Col sm={3}>
                        <Form.Control type="text" ref={this.firstNameRef}/>
                      </Col>
                      <Form.Label column sm={2} style={{fontWeight: "bold"}} > Last Name </Form.Label>
                      <Col sm={3}>
                        <Form.Control type="text" ref={this.lastNameRef}/>
                      </Col>
                    </Form.Group>
                    
                      
                    <Form.Group controlId="formBasicuserID" as={Row}>
                      <Form.Label column sm={2} style={{fontWeight: "bold"}}> userID </Form.Label>
                      <Col sm={4}>
                        <Form.Control type="userID" ref={this.userIDRef}/>
                      </Col>
                      <Button 
                        size="sm"
                        style={{background: "#22525F", border: "0px", paddingLeft: "20px", paddingRight: "20px"}}
                        onClick={this.handleVerify}
                      >
                        VERIFY
                      </Button>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" as={Row}>
                      <Form.Label column sm={2} style={{fontWeight: "bold"}} > Password </Form.Label>
                      <Col sm={4}>
                        <Form.Control type="password" ref={this.passwordRef}/>
                        {this.state.passwordWarning && <p style={{color: "red"}}>The password should contain number, capital letter, small letter, and have length longer than 5</p>}
                      </Col>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" as={Row}>
                      <Form.Label column sm={2} style={{fontWeight: "bold"}} > Email </Form.Label>
                      <Col sm={3}>
                        <Form.Control type="email1" ref={this.emailPreRef} />
                      </Col>
                      @
                      <Col sm={3}>
                        <Form.Control type="email2" ref={this.emailPostRef} />
                      </Col>
                    </Form.Group>

                    <Form.Group controlId="formBasicPhoneNumber" as={Row}>
                      <Form.Label column sm={2} style={{fontWeight: "bold"}} > Phone Number </Form.Label>
                      <Col sm={2}>
                        <Form.Control type="text" ref={this.phone1Ref} />
                      </Col>
                      -
                      <Col sm={2}>
                        <Form.Control type="text" ref={this.phone2Ref} />
                      </Col>
                      -
                      <Col sm={2}>
                        <Form.Control type="text" ref={this.phone3Ref} />
                      </Col>
                    </Form.Group>

                    <Form.Group controlId="formBasicLocation" as={Row}>
                      <Form.Label column sm={2} style={{fontWeight: "bold"}}> Location </Form.Label>
                      <Col sm={3}>
                        <Form.Control type="location" ref={this.locationRef}/>
                      </Col>
                    </Form.Group>
                    <Form.Group controlId="formBasicGenre" as={Row}>
                      <Form.Label column sm={2} style={{fontWeight: "bold"}}> Preferred Genre </Form.Label>
                    <Col key={`inline-checkbox`} className="mb-3" style={{paddingTop: "1rem"}}>
                      <Form.Check
                        inline
                        label="Romance"
                        id={`inline-checkbox-1`}
                        onClick={() => this.handleCheckBoxes("Romance")}
                      />
                      <Form.Check
                        inline
                        label="Horror"
                        id={`inline-checkbox-2`}
                        onClick={() => this.handleCheckBoxes("Horror")}
                      />
                      <Form.Check
                        inline
                        label="Fantasy"
                        id={`inline-checkbox-3`}
                        onClick={() => this.handleCheckBoxes("Fantasy")}
                      />
                      <Form.Check
                        inline
                        label="Adventure"
                        id={`inline-checkbox-4`}
                        onClick={() => this.handleCheckBoxes("Adventure")}
                      />
                      <Form.Check
                        inline
                        label="Science"
                        id={`inline-checkbox-5`}
                        onClick={() => this.handleCheckBoxes("Science")}
                      />
                      <Form.Check
                        inline
                        label="Autobiography"
                        id={`inline-checkbox-6`}
                        onClick={() => this.handleCheckBoxes("Autobiography")}
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
