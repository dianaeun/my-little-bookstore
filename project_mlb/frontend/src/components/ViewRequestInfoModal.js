import React, {Component} from 'react';
import {Modal, Button, Table} from 'react-bootstrap';

class ViewRequestInfoModal extends Component{
    showAdditionalInfo = (status) => {
        let info = [];
        if(status === "Accepted") {
            info.push(<td>Owner Contact Info</td>);
            info.push(<td>010-0000-0000</td>);
        }
        else if(status === "Pending") {
            info.push(<td colSpan = '2'>Owner Contact Informaton is not available yet.</td>);
        }
        else if(status === "Declined") {
            info.push(<td>Owner Declined your request.</td>);
            info.push(<td><Button variant="danger" onClick={()=>this.sendNewRequest}> Request Again </Button></td>);
        }
        return <tr>{info}</tr>
    }

    sendNewRequest = () => {
        // handle new request
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
                <Modal.Header style={{background: "#348093"}}closeButton>
                    <Modal.Title style={{color: "white"}}>Request Information</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Table>
                        <tr><td>Request Date </td><td>{this.props.request.date}</td></tr>
                        <tr><td>Request Status </td><td>{this.props.request.status}</td></tr>
                        <tr><td>Book Title </td><td>{this.props.request.title}</td></tr>
                        <tr><td>Owner </td><td>{this.props.request.owner}</td></tr>
                        {this.showAdditionalInfo(this.props.request.status)}
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