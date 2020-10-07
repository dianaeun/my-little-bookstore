import React, {Component} from 'react';
import {Modal, Button, ButtonGroup, ToggleButton, Form, Card, Row, Col} from 'react-bootstrap';

class AddBookModal extends Component{
    state = {
        radioValue : '1',
    };

    setRadioValue = (n) => {
        this.setState({radioValue: n})
    };
    radios = [
      { name: 'Search By ISBN', value: '1' },
      { name: 'Manual Entry', value: '2' },
      { name: 'Upload E-Book', value: '3' },
    ];
    
    render(){
        return(
            <Modal
                show={this.props.show}
                onHide={this.props.handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton style={{background: "#348093"}}>
                    <Modal.Title style={{color: "white"}}>Add Books</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Card>
                        <Card.Header>
                            <ButtonGroup toggle>
                                {this.radios.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        type="radio"
                                        style={{background: this.state.radioValue === radio.value ? "#22525F" : '#666666'
                                                ,color: this.state.radioValue === radio.value ? '#FAC917' : '#ffffff'}}
                                        // variant= {this.state.radioValue === radio.value ? 'primary' : 'secondary'}
                                        name="radio"
                                        value={radio.value}
                                        checked={this.state.radioValue === radio.value}
                                        onChange={(e) => this.setRadioValue(e.currentTarget.value)}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </Card.Header>
                        <Card.Body>
                            {this.state.radioValue === '1' &&
                                <Form>
                                    <Form.Group as={Row} controlId="ISBNInput">
                                        <Form.Label column sm={3}>
                                            ISBN
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Enter the ISBN Here to Search" />
                                        </Col>
                                    </Form.Group>
                              
                                    <Row>
                                        <Col> Result </Col>
                                    </Row>
                                </Form>
                            }
                            {this.state.radioValue === '2' &&
                                <Form>
                                    <Form.Group as={Row} controlId="TitleInput">
                                        <Form.Label column sm={3}>
                                            Title
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Title" />
                                        </Col>
                                    </Form.Group>
                              
                                    <Form.Group as={Row} controlId="AuthorInput">
                                        <Form.Label column sm={3}>
                                            Author
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Author" />
                                        </Col>
                                    </Form.Group>
                                    
                                    <Form.Group as={Row} controlId="PublisherInput">
                                        <Form.Label column sm={3}>
                                            Publisher
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Publisher" />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="PriceInput">
                                        <Form.Label column sm={3}>
                                            Price ($)
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="number" placeholder="0.00" />
                                        </Col>
                                    </Form.Group>
                                   
                              
                              </Form>
                            }
                            {this.state.radioValue === '3' && 
                                <Form>
                                    <Form.Group>
                                    <Form.File id="exampleFormControlFile1" label="The E-Book must be copyright free" />
                                    </Form.Group>
                                </Form>
                            }
                        </Card.Body> 
                    </Card>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}> Close </Button>
                    <Button variant="success" onClick={this.props.handleClose}> Save </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddBookModal;