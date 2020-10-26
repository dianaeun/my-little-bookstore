import React, {Component} from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';

class EditBookModal extends Component{
    
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
                    <Modal.Title style={{color: "white"}}>Edit Books</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    
                    <Form>
                        <Form.Group as={Row} controlId="TitleInput">
                            <Form.Label column sm={3}>
                                Name
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder={this.props.person.name} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="TitleInput">
                            <Form.Label column sm={3}>
                                location
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder={this.props.person.location} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="TitleInput">
                            <Form.Label column sm={3}>
                                contact
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder={this.props.person.contact} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="TitleInput">
                            <Form.Label column sm={3}>
                                preference
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Group controlId="formBasicGenre" as={Row}>
                                    <Col key={`inline-checkbox`} className="mb-3">
                                    <Form.Check
                                        checked = {this.props.person.preference.includes("Romance")}
                                        inline
                                        label="Romance"
                                        id={`inline-checkbox-1`}
                                    />
                                    <Form.Check
                                        checked = {this.props.person.preference.includes("Horror")}                                    
                                        inline
                                        label="Horror"
                                        id={`inline-checkbox-2`}
                                    />
                                    <Form.Check
                                        checked = {this.props.person.preference.includes("Fantasy")}
                                        inline
                                        label="Fantasy"
                                        id={`inline-checkbox-3`}
                                    />
                                    <Form.Check
                                        checked = {this.props.person.preference.includes("Adventure")}
                                        inline
                                        label="Adventure"
                                        id={`inline-checkbox-4`}
                                    />
                                    <Form.Check
                                        checked = {this.props.person.preference.includes("Science")}
                                        inline
                                        label="Science"
                                        id={`inline-checkbox-5`}
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}> Close </Button>
                    <Button variant="success" onClick={this.props.handleClose}> Save </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default EditBookModal;