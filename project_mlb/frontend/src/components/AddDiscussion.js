import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

class AddDiscussion extends Component{
    constructor(props) {
        super(props);
        this.tagRef = React.createRef();
        this.titleRef = React.createRef();
        this.contentRef = React.createRef();
    }
    handleSubmit = event => {
        event.preventDefault();
        const tag = this.tagRef.current.value;
        const title = this.titleRef.current.value;
        const content = this.contentRef.current.value;
        const date = new Date();
        if (tag.trim().length === 0 || title.trim().length === 0 || content.trim().length === 0){
            console.log("warning modal (null type input)");
            alert("Please fill in all fields!");
            return;
        }
        const requestBody = {
            query: `
                mutation CreateDiscussion($owner: String!, $date: String!, $tag: String!, $title: String!, $content:String!){
                    createDiscussion(discussionInput: {owner: $owner, date: $date, tag: $tag, title: $title, content: $content}){
                        _id
                    }
                }
            `,
            variables: {
                owner: this.props.owner,
                date: date,
                tag: tag,
                title: title,
                content: content,
            }
        };
        fetch("/graphql", {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
        .then(res => {
            console.log(res.status);
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed to fetch during add discussion!!!!');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            if (resData.data.createDiscussion !== null){
                console.log("successfully added your discussion!", resData);
                alert("You have successfully added a discussion!");
            }
        })
        .catch(err =>{
            console.log(err);
        });
        this.props.handleClose();
        this.props.fetchDiscussions();
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
                <Modal.Title>Start Your Discussion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <Form.Group controlId="controlTextarea1">
                <Form.Label>Tag (Book Title)</Form.Label>
                <Form.Control as="textarea" rows="1" ref={this.tagRef}/>
                </Form.Group>
                <Form.Group controlId="controlTextarea2">
                <Form.Label>Title</Form.Label>
                <Form.Control as="textarea" rows="1" ref={this.titleRef}/>
                </Form.Group>
                <Form.Group controlId="controlTextarea3">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows="3" ref={this.contentRef}/>
                </Form.Group>
                
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                </Button>
                <Button variant="success" type="submit"> Save </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default AddDiscussion;