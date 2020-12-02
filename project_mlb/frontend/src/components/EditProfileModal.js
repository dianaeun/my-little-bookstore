import React, {Component} from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import { validateEditProfile } from '../functions/InputValidations.js';
class EditBookModal extends Component{
    state = {
        genres: [],
        initialized: false
    };
    constructor(props){
        super(props);
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.locationRef = React.createRef();
        this.emailRef = React.createRef();
    }
    initializeGenres = () => {
        if(!this.state.initialized){
            this.setState({genres: this.props.preferredGenres, initialized: true})
        }
    }
    
    handleCheckBoxes = target => {
        this.initializeGenres();
        this.setState(prevState => {
            let genres = [...prevState.genres];
            console.log("prevGenres:", genres);
            if (genres.indexOf(target) === -1) {
                genres.push(target);
            }
            else {
                genres.splice(genres.indexOf(target), 1);
            }
            return {genres: genres}
        });
    }
    handleSubmit = event => {
        this.initializeGenres();
        event.preventDefault();
        console.log(this.props.user);
        const firstName = this.firstNameRef.current.value;
        const lastName = this.lastNameRef.current.value;
        const location = this.locationRef.current.value;
        const email = this.emailRef.current.value;
        const preferredGenres = this.state.genres;
        console.log(preferredGenres);
        if (!validateEditProfile(firstName,lastName,email)){
          console.log("warning modal (null type input)");
          return;
        }
        if(location.trim().length === 0) {
            location = "";
        }
        const requestBody = {
          query: `
                mutation EditUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $userID: String!, $location: String, $preferredGenres: [String]!){
                    editUser(userInput: {firstName: $firstName, lastName: $lastName, email: $email, password: $password, userID: $userID, location: $location, preferredGenres: $preferredGenres}) {
                        _id
                        firstName
                        lastName
                        email
                        userID
                        location
                        preferredGenres
                    }
                  }
            `,
            variables: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: "",
                userID: this.props.userID,
                location: location,
                preferredGenres: preferredGenres
            }
        };
        fetch("/graphql", {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
        .then(res => {
          console.log(res.status);
          if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed to fetch during edit profile!!!!');
          }
          return res.json();
        })
        .then(resData => {
          console.log("successfully edited user!", resData);
        })
        .catch(err =>{
          console.log(err);
          //throw err;    => user 가 이미 존재할때 그냥 error 을 throw 시켜버릴때 먹통이된다! 
        });
        this.props.handleClose();
    }
    render(){
        return(
            <Modal
                show={this.props.show}
                onHide={this.props.handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header style={{background: "#348093"}}closeButton>
                    <Modal.Title style={{color: "white"}}>Edit Profile</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    
                    <Form>
                        <Form.Group as={Row} controlId="TitleInput">
                            <Form.Label column sm={3}>
                                Name
                            </Form.Label>
                            <Col sm={5}>
                                <Form.Control type="text" defaultValue={this.props.user.firstName} ref={this.firstNameRef}/>
                            </Col>
                            <Col sm={4}>
                                <Form.Control type="text" defaultValue={this.props.user.lastName} ref={this.lastNameRef}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="TitleInput">
                            <Form.Label column sm={3}>
                                Location
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" defaultValue={this.props.user.location} ref={this.locationRef}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="TitleInput">
                            <Form.Label column sm={3}>
                                Email
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" defaultValue={this.props.user.email} ref={this.emailRef}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="TitleInput">
                            <Form.Label column sm={3}>
                                preference
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Group controlId="formBasicGenre" as={Row}>
                                    <Col key={`inline-checkbox`} className="mb-3">
                                    <Form.Check
                                        defaultChecked = {this.props.preferredGenres.includes("Romance")}
                                        inline
                                        label="Romance"
                                        id={`inline-checkbox-1`}
                                        onChange={() => this.handleCheckBoxes("Romance")}
                                    />
                                    <Form.Check
                                        defaultChecked = {this.props.preferredGenres.includes("Horror")}                                    
                                        inline
                                        label="Horror"
                                        id={`inline-checkbox-2`}
                                        onChange={() => this.handleCheckBoxes("Horror")}
                                    />
                                    <Form.Check
                                        defaultChecked = {this.props.preferredGenres.includes("Fantasy")}
                                        inline
                                        label="Fantasy"
                                        id={`inline-checkbox-3`}
                                        onChange={() => this.handleCheckBoxes("Fantasy")}
                                    />
                                    <Form.Check
                                        defaultChecked = {this.props.preferredGenres.includes("Adventure")}
                                        inline
                                        label="Adventure"
                                        id={`inline-checkbox-4`}
                                        onChange={() => this.handleCheckBoxes("Adventure")}
                                    />
                                    <Form.Check
                                        defaultChecked = {this.props.preferredGenres.includes("Science")}
                                        inline
                                        label="Science"
                                        id={`inline-checkbox-5`}
                                        onChange={() => this.handleCheckBoxes("Science")}
                                    />
                                    <Form.Check
                                        defaultChecked = {this.props.preferredGenres.includes("Science")}
                                        inline
                                        label="Autobiography"
                                        id={`inline-checkbox-6`}
                                        onClick={() => this.handleCheckBoxes("Autobiography")}
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}> Close </Button>
                    <Button variant="success" onClick={(event) => this.handleSubmit(event)}> Save </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default EditBookModal;