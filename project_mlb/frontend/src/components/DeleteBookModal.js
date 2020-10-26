import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class DeleteBookModal extends Component{
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
                <Modal.Title>Are you sure you want to delete this book?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                You cannot take it back once you delete it.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={this.props.handleClose}>Delete</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default DeleteBookModal;