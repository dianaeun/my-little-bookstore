import React, {Component} from 'react';
import {Modal, Button,Form} from 'react-bootstrap';

class Addreview extends Component{
    constructor(props) {
        super(props);
        this.contentRef = React.createRef();
    }
    handleSubmit = event => {
        event.preventDefault();
        const content = this.contentRef.current.value;
        const date = new Date();
        if (content.trim().length === 0){
            console.log("warning modal (null type input)");
            alert("Please fill in all fields!");
            return;
        }
        const requestBody = {
            query: `
                mutation CreateReview($book: ID!, $reviewer: ID!, $date: String!, $content:String!){
                    CreateReview(reviewInput: {book: $book, reviewer: $reviewer, date: $date, content: $content}){
                        _id
                    }
                }
            `,
            variables: {
                book: this.props.book._id,
                reviewer: this.props.reviewer._id,
                date: date,
                content: content
            }
        };
        fetch("http://localhost:8000/graphql", {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
        .then(res => {
            console.log(res.status);
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed to fetch during add discussion!!!!');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            if (resData.data.createReview !== null){
                console.log("successfully added your review!", resData);
                alert("You have successfully added a review!");
            }
        })
        .catch(err =>{
            console.log(err);
        });
        this.props.handleClose();
        this.props.fetchReviews();
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
                <Modal.Header closeButton>
                <Modal.Title>Review message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Leave your comment</Form.Label>
                <Form.Control as="textarea" rows="3" ref={this.contentRef}/>
                </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={(event) => this.handleSubmit(event)}> Save </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Addreview;