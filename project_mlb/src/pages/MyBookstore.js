import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import AddBookModal from '../components/AddBookModal';
import DeleteBookModal from '../components/DeleteBookModal';

class MyBookstore extends Component{
    state={
        addBook : false,
        deleteBook : false
      }
      handleClose = () => {
        this.setState({deleteBook: false, addBook: false});
      }
      handleAddBook = () => {
        this.setState({addBook: true});
      }
      handleDeleteBook = () => {
        this.setState({deleteBook: true});
      }
    render(){
        return (
            <div>
                <h1> Hi I'm My Bookstore Page!</h1>
                <AddBookModal show={this.state.addBook} handleClose={this.handleClose}/>
                <DeleteBookModal show={this.state.deleteBook} handleClose={this.handleClose}/>
                <Button variant="info" onClick={this.handleAddBook}>Add Books</Button>
                <Button variant="info" onClick={this.handleDeleteBook}>Delete Books</Button>


            </div>
        )
    }
}

export default MyBookstore;
