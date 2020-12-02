import React, {Component} from 'react';
import {Modal, Button,Form} from 'react-bootstrap';

class AddReview extends Component{
    constructor(props) {
        super(props);
        this.titleRef = React.createRef();
        this.contentRef = React.createRef();
    }
    handleSubmit = event => {
        event.preventDefault();
        const title = this.titleRef.current.value;
        const content = this.contentRef.current.value;
        const date = new Date();
        if (content.trim().length === 0){
            console.log("warning modal (null type input)");
            alert("Please fill in all fields!");
            return;
        }
        const requestBody = {
            query: `
                mutation CreateReview($bookTitle: String!, $reviewer: String!, $date: String!, $title: String!, $content: String!){
                    createReview(reviewInput: {bookTitle: $bookTitle, reviewer: $reviewer, date: $date, title: $title, content: $content}){
                        _id
                    }
                }
            `,
            variables: {
                bookTitle: this.props.book,
                reviewer: this.props.reviewer,
                date: date,
                title: title,
                content: content
            }
        };
        fetch("/graphql", {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
        .then(res => {
            console.log(res.status);
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed to fetch during add review!!');
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
        //this.props.fetchReviews();
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
                <Modal.Title>Share Your Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group controlId="controlTextarea1">
                <Form.Label>Title</Form.Label>
                <Form.Control as="textarea" rows="1" ref={this.titleRef}/>
                </Form.Group>
                <Form.Group controlId="controlTextarea2">
                <Form.Label>Content</Form.Label>
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

export default AddReview;
