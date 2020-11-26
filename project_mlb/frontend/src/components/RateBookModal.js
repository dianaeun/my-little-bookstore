import React, {Component} from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

// const star = require("../icons/star.png");
// const blankStar = require("../icons/blank_star.png");


class RateBookModal extends Component{
    constructor(props) {
        super(props);
    }
    static contextType = AuthContext;
    state = {
        rating: 0
    }
    handleSubmit = event => {
        event.preventDefault();
        console.log("bookSelected!:", this.props.book);
        const requestBody = {
            query: `
                mutation Rate($id: ID!, $rating: Int!, $userID: ID!){
                    rate(_id: $id, rating: $rating, userID: $userID){
                        bookTitle
                        ratingSum
                        rating
                    }
                }
            `,
            variables: {
                id: this.props.book.rating._id,
                rating: this.state.rating,
                userID: this.context.user_id
            }
        };
        fetch('/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed to rate!")
            }
            return res.json()
        })
        .then(resData => {
            console.log(resData);
            if (resData.data.rate){
                console.log("successfully rated!", resData);
            }
            return resData;
        })
        .catch(err =>{
            console.log(err);
        });
        this.props.handleClose();
        this.props.fetchBooks();
        return;
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
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rate {this.props.book.title}!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group as={Row} controlId="RateInput">
                            <Col sm={9}>
                                {/* <Form.Control type="range" min="0" max="5" ref={this.ratingRef}/> */}
                                <div key={`inline-radio`} style={{textAlign: "right"}}>
                                    <Form.Label column sm="3" style={{marginRight: "1rem"}}>Rating</Form.Label>
                                    <Form.Check inline label='1' type='radio' name='category' id='1' onClick = {() => this.setState({rating: 1})}/>
                                    <Form.Check inline label='2' type='radio' name='category' id='2' onClick = {() => this.setState({rating: 2})}/>
                                    <Form.Check inline label='3' type='radio' name='category' id='3' onClick = {() => this.setState({rating: 3})}/>
                                    <Form.Check inline label='4' type='radio' name='category' id='4' onClick = {() => this.setState({rating: 4})}/>
                                    <Form.Check inline label='5' type='radio' name='category' id='5' onClick = {() => this.setState({rating: 5})}/>
                                </div>
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
                        <Button variant="success" type="submit"> Save </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default RateBookModal;