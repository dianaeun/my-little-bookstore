import React, {Component} from 'react';
import {Modal, Button, ButtonGroup, ToggleButton, Form, Card, Row, Col} from 'react-bootstrap';

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
                                            Title
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder={this.props.book.title} />
                                        </Col>
                                    </Form.Group>
                              
                                    <Form.Group as={Row} controlId="AuthorInput">
                                        <Form.Label column sm={3}>
                                            Author
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder={this.props.book.author}/>
                                        </Col>
                                    </Form.Group>
                                    
                                    <Form.Group as={Row} controlId="PublisherInput">
                                        <Form.Label column sm={3}>
                                            Publisher
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder={this.props.book.publisher} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="PriceInput">
                                        <Form.Label column sm={3}>
                                            Price ($)
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="number" placeholder={this.props.book.price} />
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