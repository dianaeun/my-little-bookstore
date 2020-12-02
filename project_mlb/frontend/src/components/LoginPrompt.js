import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class LoginPrompt extends Component{
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
                <Modal.Title>Unauthorized Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please log in first
                </Modal.Body>
                <Modal.Footer>
                <Button variant="info" onClick={this.props.handleClose}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default LoginPrompt;