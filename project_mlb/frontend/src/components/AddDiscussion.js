import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

class AddDiscussion extends Component{
    render(){
        return(
            <Modal
                show={this.props.show}
                onHide={this.props.handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >   
                <Form onSubmit={this.props.handleAddDiscussion}>
                <Modal.Header closeButton>
                <Modal.Title>Start Your Discussion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <Form.Group controlId="controlTextarea1">
                <Form.Label>Tag (Book Title)</Form.Label>
                <Form.Control as="textarea" rows="1" onChange={(event) => this.props.handleTagChange(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="controlTextarea2">
                <Form.Label>Title</Form.Label>
                <Form.Control as="textarea" rows="1" onChange={(event) => this.props.handleTitleChange(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="controlTextarea3">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows="3" onChange={(event) => this.props.handleContentChange(event.target.value)}/>
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