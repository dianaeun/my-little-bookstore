import React, {Component} from 'react';
import {Modal, Button, ButtonGroup, ToggleButton} from 'react-bootstrap';

class AddBookModal extends Component{
    state = {
        isbn : true,
        manual : false,
        ebook: false
    };
    radios = [
      { name: 'Active', value: '1' },
      { name: 'Radio', value: '2' },
      { name: 'Radio', value: '3' },
    ];
    setRadioValue = () => {
        return 0;
    }
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
                <Modal.Title>Add Books</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ButtonGroup toggle>
                    {this.radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        type="radio"
                        variant="secondary"
                        name="radio"
                        value={radio.value}
                        checked={radio.Value === radio.value}
                        onChange={(e) => this.setRadioValue(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                    ))}
                </ButtonGroup>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={this.props.handleClose}>Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddBookModal;