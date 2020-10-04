import React, {Component} from 'react';
import {Modal, Button, ButtonGroup, ToggleButton, Form, Card, Row, Col, Table} from 'react-bootstrap';

class ViewRequestInfoModal extends Component{
    
    render(){
        return(
            <Modal
                show={this.props.show}
                onHide={this.props.handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header style={{background: "#348093"}}closeButton>
                    <Modal.Title style={{color: "white"}}>Request Information</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Table>
                        <tr><td>Request Date </td><td>{this.props.request.date}</td></tr>
                        <tr><td>Request Status </td><td>{this.props.request.status}</td></tr>
                        <tr><td>Book Title </td><td>{this.props.request.title}</td></tr>
                        <tr><td>Owner </td><td>{this.props.request.owner}</td></tr>
                    </Table>  
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}> Close </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ViewRequestInfoModal;