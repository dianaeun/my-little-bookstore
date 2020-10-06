import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class LogoutModal extends Component{
    render(){
        return(
            <Modal
                show={this.props.show}
                onHide={this.props.handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to Logout?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Click yes to logout
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.props.logout}>Yes</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default LogoutModal;