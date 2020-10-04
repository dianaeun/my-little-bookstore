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
                <Modal.Header closeButton>
                <Modal.Title>Start Your Discussion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group controlId="controlTextarea1">
                <Form.Label>Tag (Book Title)</Form.Label>
                <Form.Control as="textarea" rows="1" />
                </Form.Group>
                <Form.Group controlId="controlTextarea2">
                <Form.Label>Title</Form.Label>
                <Form.Control as="textarea" rows="1" />
                </Form.Group>
                <Form.Group controlId="controlTextarea3">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows="3" />
                </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={this.props.handleClose}> Save </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddDiscussion;