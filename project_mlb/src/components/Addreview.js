import React, {Component} from 'react';
import {Modal, Button,Form} from 'react-bootstrap';

class Addreview extends Component{
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
                <Form.Label>say anything</Form.Label>
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

export default Addreview;