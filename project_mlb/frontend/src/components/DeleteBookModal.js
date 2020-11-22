import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class DeleteBookModal extends Component{
    handleBookDelete = (book) => {
        console.log(book);
        const requestBody = {
            query: `
                  mutation DeleteBook($bookID: ID!){
                      deleteBook(bookId: $bookID) {
                          _id
                      }
                  }
              `,
              variables: {
                  bookID: book._id
              }
          };
          fetch("/graphql", {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
          .then(res => {
            console.log(res.status);
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed to fetch during delete book!!!!');
            }
            return res.json();
          })
          .then(resData => {
            console.log("successful deleted your book!", resData);
          })
          .catch(err =>{
            console.log(err);
            //throw err;    => user 가 이미 존재할때 그냥 error 을 throw 시켜버릴때 먹통이된다! 
          });
          alert("you have successfully deleted a book!");
          this.props.handleClose();
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
                <Modal.Title>Are you sure you want to delete this book?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                You cannot take it back once you delete it.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={()=>{this.handleBookDelete(this.props.book)}}>Delete</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default DeleteBookModal;