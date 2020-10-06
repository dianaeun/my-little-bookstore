import React, {Component} from 'react';
import {Button, Table, Jumbotron, Container} from 'react-bootstrap';
import { Link} from "react-router-dom";
import MlbNavbar from '../components/NavigationBar.js'

import AddBookModal from '../components/AddBookModal';
import DeleteBookModal from '../components/DeleteBookModal';
import Advertisement from '../components/Advertisement';
import EditBookModal from '../components/EditBookModal';
const star = require("../icons/star.png");
const blankStar = require("../icons/blank_star.png");
const edit = require("../icons/edit.png");
const delIcon = require("../icons/delete.png");

class MyBookstore extends Component{
    state={
        addBook : false,
        deleteBook : false,
        editBook : false,
        bookSelected: null
    }
    books = [
      { date: '2019/09/04', title: 'Harry Potter and the Philosopher', author: 'J.K. Rowling', price: 15.00, rate: 5 , publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A", Title1: "Philosopher...?", hycomment: "This is not that exciting", Title2: "What is this for?", dayecomment: "I have never seen this book before"},
      { date: '2019/09/04',title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', price: 16.00, rate: 5 , publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A", Title1: "Exciting", hycomment: "This book is really interesting. I really recommend to buy this book!", Title2: "Fantasy is alwasys good", dayecomment: "Easy to read"},
      { date: '2019/09/28',title: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling', price: 15.00, rate: 4, publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A", Title1: "Do not forget?", hycomment: "Harry poter is impressive", Title2: "Still reading", dayecomment: "so interesting to read"},
      { date: '2020/01/05',title: 'Harry Potter and the Order of the Phoenix', author: 'J.K. Rowling', price: 17.00, rate: 5, publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A", Title1: "You won't regret", hycomment: "to buy Harry poter series", Title2: "Order this book now", dayecomment: "you won't regret"},
      { date: '2020/05/17',title: 'Harry Potter and The Goblet of Fire', author: 'J.K. Rowling', price: 20.00, rate: 3 , publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A", Title1: "What am I going to talk ", hycomment: "...", Title2: "Nothing to say", dayecomment: "Incredible"},
      { date: '2020/06/25',title: 'Harry Potter and the Half-Blood Prince', author: 'J.K. Rowling', price: 10.00, rate: 4, publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A" , Title1: "who is the main character", hycomment: "Harry poter?", Title2: "No", dayecomment: "That is secret"},
      { date: '2020/07/30',title: 'Harry Potter and the Deathly Hallows – Part 1', author: 'J.K. Rowling', price: 13.00, rate: 4, publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A" , Title1: "Nothing to mention", hycomment: "No idea", Title2: "Let's skip", dayecomment: "okay?"},
      { date: '2020/08/01',title: 'Harry Potter and the Deathly Hallows – Part 2', author: 'J.K. Rowling', price: 30.00, rate: 3, publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A" , Title1: "Test!", hycomment: "Okay test", Title2: "Last commnet", dayecomment: "Success"},
    ];
    handleClose = () => {
      this.setState({deleteBook: false, addBook: false, editBook: false});
    }
    handleAddBook = () => {
      this.setState({addBook: true});
    }
    handleDeleteBook = () => {
      this.setState({deleteBook: true});
    }
    handleEditBook = (book) => {
      console.log(book);
      this.setState({editBook: true, bookSelected: book});
    }
    createStar = (n) => {
      let stars = [];
      for (let i = 0; i < n; i++){
          stars.push(<img src={star} alt="star" style={{ width: "22px" }} />);
      }
      for (let i = n; i < 5; i++) {
          stars.push(<img src={blankStar} alt="star" style={{ width: "22px" }} />);
      }
      return <td>{stars}</td>
    }


    render(){
        return (
            <div>
                <MlbNavbar/>

                <AddBookModal show={this.state.addBook} handleClose={this.handleClose}/>
                <DeleteBookModal show={this.state.deleteBook} handleClose={this.handleClose}/>
                {this.state.bookSelected && <EditBookModal show={this.state.editBook} handleClose={this.handleClose} book={this.state.bookSelected}/>}
                <Jumbotron fluid>
                  <Container>
                    <h1>DongHun's Bookstore</h1>
                  </Container>
                </Jumbotron>
                <Table size="sm" style={{ width: "1000px", marginLeft: "auto", marginRight: "auto", paddingTop: "1rem"}}>
                  <thead>
                    <tr>
                      <th>Date Added</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Price</th>
                      <th>Rating</th>
                      <th></th>
                      <th></th>

                    </tr>
                  </thead>
                  <tbody>
                    {this.books.map((book) => (    
                      <tr>
                        <td>{book.date}</td>
                        <td>
                            <Link className="nav-link" style={{color: "black", padding: "0rem"}} to={{pathname: "/IndividualBookpage" , book:book}} >{book.title}</Link>
                        </td>
                        <td>{book.author}</td>
                        <td>{book.price}</td>
                        {this.createStar(book.rate)}                       
                        <td>
                            <Button variant="light" onClick={()=>{this.handleEditBook(book)}}>
                              <img src={edit} alt="Edit Book" style={{ width: "1.5rem", padding: "0rem" }} />
                            </Button>
                        </td>
                        <td>
                            <Button variant="light" onClick={this.handleDeleteBook}>
                              <img src={delIcon} alt="Delete Book" style={{ width: "1.5rem", padding: "0rem" }} />
                            </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <Button variant="info" onClick={this.handleAddBook}>Add Books</Button>
                </Table>
                <Advertisement/>     
            </div>
        )
    }
}

export default MyBookstore;
