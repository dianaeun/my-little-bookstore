import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class RequestModal extends Component{
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
                <Modal.Title>Request message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                You are successfully send a request message to seller.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default RequestModal;