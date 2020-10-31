import React, {Component} from 'react';
import {Button, Table} from 'react-bootstrap';
import { Link} from "react-router-dom";
import MlbNavbar from '../components/NavigationBar.js'

import AddBookModal from '../components/AddBookModal';
import DeleteBookModal from '../components/DeleteBookModal';
// import Advertisement from '../components/Advertisement';
import EditBookModal from '../components/EditBookModal';
import './MyBookstore.css';
import AuthContext from '../context/AuthContext';

const star = require("../icons/star.png");
const blankStar = require("../icons/blank_star.png");
const edit = require("../icons/edit.png");
const edit_no = require("../icons/edit_dis.png");
const delIcon = require("../icons/delete.png");

class MyBookstore extends Component{
    state={
        addBook : false,
        deleteBook : false,
        editBook : false,
        bookSelected: null,
        books: [],
        bookForDelete: null
    }
    static contextType = AuthContext;
    componentDidMount() {
      this.fetchBooks();
    }
    fetchBooks() {
      const requestBody = {
          query: `
              query{
                  userBooks(ownerID: "${this.context.userId}"){
                    _id
                    date
                    title
                    author
                    publisher
                    rating
                    price
                    genre
                    requests
                  }
              }
          `
      }
      fetch('http://localhost:8000/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
      .then(res => {
          if (res.status !== 200 && res.status !== 201) {
              throw new Error("Failed to fetch books!")
          }
          return res.json()
      })
      .then(resData => {
          console.log("Books are successfully fetched! ", resData);
          const books = resData.data.userBooks;
          console.log(books);
          this.setState({books: books});
      })
      .catch(err => { console.log(err);});
  };
    handleClose = () => {
      this.setState({deleteBook: false, addBook: false, editBook: false, bookForDelete: null});
      this.fetchBooks();
    }
    handleAddBook = () => {
      this.setState({addBook: true});
    }
    handleDeleteBook = (book) => {
      this.setState({deleteBook: true, bookForDelete: book});
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
      return <td style={{paddingLeft: "2rem"}}>{stars}</td>
    }
    createRequestsCol = (request) => {
      return request > 0  ? <p style={{color: "red", fontWeight: "bold"}}>{request}</p> : <p>{request}</p>
    }
    render(){
        return (
            <div>
                <MlbNavbar/>
                <AddBookModal show={this.state.addBook} handleClose={this.handleClose} owner={this.context.userId}/>
                <DeleteBookModal show={this.state.deleteBook} handleClose={this.handleClose} book={this.state.bookForDelete}/>
                {this.state.bookSelected && <EditBookModal show={this.state.editBook} handleClose={this.handleClose} book={this.state.bookSelected}/>}

                <div style={{marginLeft: "10%", marginTop: "2rem", background: "#eeeeee", width: "25%", textAlign: "center", borderRadius: "4rem", padding: "0.6rem"}}>
                  <h1 style={{fontSize: "2rem"}}>{this.context.userId}'s Bookstore</h1>
                </div>
                <Table className="myTable" size="sm" style={{ width: "80%", marginTop: "1.5rem", marginLeft: "auto", marginRight: "auto", paddingTop: "1rem"}}>
                  <thead>
                    <tr>
                      <th>Date Added</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th style={{paddingLeft: "2rem"}}>Price</th>
                      <th style={{paddingLeft: "2rem"}}>Rating</th>
                      <th style={{paddingLeft: "1rem"}}>edit</th>
                      <th style={{paddingLeft: "1rem"}}>del</th>
                      <th style={{paddingLeft: "2rem"}}>Requests</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.books.map((book) => (    
                      <tr>
                        <td style={{paddingTop: "0.5rem"}}>{book.date}</td>
                        <td style={{paddingTop: "0rem"}}>
                            <Link className="nav-link" to={{pathname: "/IndividualBookpage" , book:book}} >{book.title}</Link>
                        </td>
                        <td style={{paddingTop: "0.5rem"}}><Link href="#">{book.author}</Link></td>
                        <td style={{paddingLeft: "2rem", paddingTop: "0.5rem"}}>${book.price}</td>
                        {this.createStar(book.rating)}                  
                        {book.requests.length ? <td style={{paddingLeft: "1.1rem", paddingTop: "0.5rem"}}><img src={edit_no} alt="Edit Disabled" style={{ width: "1.5rem", padding: "0rem"}} /></td>
                          : <td><Button variant="light" onClick={()=>{this.handleEditBook(book)}}>
                            <img src={edit} alt="Edit Book" style={{ width: "1.5rem", padding: "0rem" }} />
                            </Button></td>}                       
                        <td>
                            <Button variant="light" onClick={() => {this.handleDeleteBook(book)}}>
                              <img src={delIcon} alt="Delete Book" style={{ width: "1.5rem", padding: "0rem" }} />
                            </Button>
                        </td>
                        <td style={{paddingTop: "0.5rem", paddingLeft: "4rem"}}>{this.createRequestsCol(book.requests.length)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <Button variant="info" onClick={this.handleAddBook}>Add Books</Button>
                </Table>
                {/* <Advertisement/>      */}
                <div style={{marginLeft: "10%", marginTop: "2rem", background: "#eeeeee", width: "25%", textAlign: "center", borderRadius: "4rem", padding: "0.6rem"}}>
                  <h1 style={{fontSize: "2rem"}}>Received Requests</h1>
                </div>
                <Table className="myTable" size="sm" style={{ width: "80%", marginTop: "1.5rem", marginLeft: "auto", marginRight: "auto", paddingTop: "1rem"}}>
                <thead>
                    <tr>
                      <th>Date Received</th>
                      <th>Title</th>
                      <th>Sender</th>
                      <th>Action</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.books.filter(function (book){return book.requests.length > 0}).map((book) => (
                      <tr>
                        <td>{book.requests[0].date}</td>
                        <td>{book.title}</td>
                        <td>{book.requests[0].sender}</td>
                        <td>
                          <Button variant="outline-primary" size="sm" style={{marginLeft:"0.2rem", fontWeight: "bold"}}>Accept</Button>
                          <Button variant="outline-danger" size="sm" style={{marginLeft:"0.2rem", fontWeight: "bold"}}>Decline</Button>
                        </td>
                        <td>
                          Pending
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
            </div>
        )
    }
}

export default MyBookstore;
