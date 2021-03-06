import React, {Component} from 'react';
import {Button, Table, Spinner, Row} from 'react-bootstrap';
import { Link } from "react-router-dom";
import MlbNavbar from '../components/NavigationBar.js'

import AddBookModal from '../components/AddBookModal';
import DeleteBookModal from '../components/DeleteBookModal';
// import Advertisement from '../components/Advertisement';
import EditBookModal from '../components/EditBookModal';
import RateBookModal from '../components/RateBookModal';
//import './MyBookstore.css';
import AuthContext from '../context/AuthContext';
import {createStar} from './Main';


const edit = require("../icons/edit.png");
const edit_no = require("../icons/edit_dis.png");
const delIcon = require("../icons/delete.png");

export const createRequestsCol = (request) => {
  return request > 0  ? <p style={{color: "red", fontWeight: "bold"}}>{request}</p> : <p>{request}</p>
}

class MyBookstore extends Component{
    state={
        addBook : false,
        deleteBook : false,
        editBook : false,
        bookSelected: null,
        books: [],
        ebooks: [],
        bookForDelete: null,
        receivedRequests: [],
        isLoadingBook: false,
        isLoadingEBook: false,
        isLoadingRequest: false,
        rateBook: false
    }
    static contextType = AuthContext;
    componentDidMount() {
      this.fetchRequests();
      this.fetchBooks();
      this.fetchEBooks();
    }
    fetchBooks = () => {
      this.setState({isLoadingBook: true});
      const requestBody = {
          query: `
              query{
                  userBooks(ownerID: "${this.context.user_id}"){
                    _id
                    date
                    title
                    author
                    publisher
                    rating{
                      _id
                      rating
                      raters
                    }
                    owner{
                      userID
                      _id
                    }
                    price
                    genre
                    isbn
                    description                    
                  }
              }
          `
      }
      fetch('/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
      .then(res => {
          if (res.status !== 200 && res.status !== 201) {
              throw new Error("Failed to fetch books!")
          }
          return res.json()
      })
      .then(resData => {
          console.log("user Books are successfully fetched! ", resData);
          const books = resData.data.userBooks;
          // console.log("Books: ", books);
          this.setState({books: books, isLoadingBook: false});
      })
      .catch(err => { console.log(err);});
    };
    fetchEBooks = () => {
      this.setState({isLoadingEBook: true});
      const requestBody = {
          query: `
              query{
                userEBooks(ownerID: "${this.context.user_id}"){
                    _id
                    date
                    title
                    file
                    rating{
                      _id
                      rating
                      raters
                    }             
                  }
              }
          `
      }
      fetch('/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
      .then(res => {
          if (res.status !== 200 && res.status !== 201) {
              throw new Error("Failed to fetch Ebooks!")
          }
          return res.json()
      })
      .then(resData => {
          console.log("user E-Books are successfully fetched! ", resData);
          const books = resData.data.userEBooks;
          //console.log("Books: ", books);
          this.setState({ebooks: books, isLoadingEBook: false});
      })
      .catch(err => { console.log(err);});
    };
    fetchRequests() {
      console.log(this.context.user_id);
      this.setState({isLoadingRequest: true});
      const requestBody = {
        query: `
            query{
              receivedRequests(receiverID: "${this.context.user_id}"){
                bookTitle
                sender{
                  _id
                  userID
                  email
                }
                receiver{
                  _id
                  userID
                  email
                }
                status
                date
                _id
                book{
                  _id
                }
              }
            }
        `
      }
      fetch('/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed to fetch requests!")
        }
        return res.json()
      })
      .then(resData => {
          console.log("Received Requests are successfully fetched", resData);
          const receivedRequests = resData.data.receivedRequests;
          console.log("Received Requests: ", receivedRequests);
          this.setState({receivedRequests: receivedRequests, isLoadingRequest: false});
      })
    }
    handleRequest = (request, type) => {  
      this.setState({isLoadingRequest: true});
      const requestBody = {
          query: `
              mutation{
                ${type}(requestID: "${request._id}"){
                  bookTitle
                  sender{
                    _id
                    userID
                    email
                  }
                  receiver{
                    _id
                    userID
                    email
                  }
                  status
                  date
                  _id
                  book{
                    _id
                  }
                }
              }
          `}
      fetch('/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed to mutate (handle) request!")
        }
        return res.json()
      })
      .then(resData => {
          console.log(type, " are successfully proceeded", resData);
          let handledRequest = type === "acceptRequest" ? resData.data.acceptRequest : resData.data.declineRequest;
          // console.log("handledRequest:", handledRequest);
          this.setState(prevState => {
            let updatedRequests = [...prevState.receivedRequests];
            // console.log("before requests: ", updatedRequests)
            const index = updatedRequests.findIndex((el) => el._id === handledRequest._id);
            updatedRequests[index] = handledRequest;
            // console.log("change to..", handledRequest);
            console.log("after requests: ", updatedRequests)

            return {receivedRequests: updatedRequests, isLoadingRequest: false}
          })
      })
        
      
    };
  
    handleClose = () => {
      this.setState({deleteBook: false, addBook: false, editBook: false, bookForDelete: null, rateBook: false, bookSelected: null});
      this.fetchBooks();
      this.fetchEBooks();
    }
    handleCloseRating = () => {
      this.setState(prevState => {
        let updatedBooks = [...prevState.books];
        return {books: updatedBooks, rateBook: false, bookSelected: null}
      })
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
    handleRateBook = (book) => {
      console.log(book);
      if (book.rating.raters.includes(this.context.user_id)){
        alert("Already Rated This Book!!");
        return;
      }
      this.setState({rateBook: true, bookSelected: book});
    }
    
    isRequested = (bookID) => {
      let count = 0;
      // console.log("isRequested......receivedRequests", this.state.receivedRequests);
      this.state.receivedRequests.map(request => {
        if (request.book._id === bookID)
          count++;
      })
      return count;
    }
    
    createRequestsCol = (request) => {
      return request > 0  ? <p style={{color: "red", fontWeight: "bold"}}>{request}</p> : <p>{request}</p>
    }
    openEbook = (file) => {
      let fileWindow = window.open("")
      fileWindow.document.write("<body><embed width='100%' height='100%' src='" + file + "'></embed></body>")
    }
    render(){
        return (
            <div>
                <MlbNavbar/>
                <AddBookModal show={this.state.addBook} handleClose={this.handleClose} owner={this.context.user_id}/>
                <DeleteBookModal show={this.state.deleteBook} handleClose={this.handleClose} book={this.state.bookForDelete}/>
                {this.state.rateBook && <RateBookModal show={this.state.rateBook} handleClose={this.handleCloseRating} book={this.state.bookSelected} fetchBooks={this.fetchBooks}/>}

                {this.state.bookSelected && <EditBookModal show={this.state.editBook} handleClose={this.handleClose} book={this.state.bookSelected} owner={this.context.user_id}/>}
                  <React.Fragment>
                    <div style={{marginLeft: "10%", marginTop: "2rem", background: "#eeeeee", width: "25%", textAlign: "center", borderRadius: "4rem", padding: "0.6rem"}}>
                      <h1 style={{fontSize: "2rem"}}>{this.context.firstName}'s Bookstore</h1>
                    </div>
                    <div style={{marginLeft: "10%", marginTop: "2rem", background: "#FFFFE0", width: "20%", textAlign: "center", borderRadius: "1rem", padding: "0.5rem"}}>
                      <h3>Books</h3>
                    </div>
                    <Table className="myTable" size="sm" style={{ width: "80%", marginLeft: "auto", marginRight: "auto"}}>
                      <thead>
                        <tr>
                          <th>Date Added</th>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Price</th>
                          <th>Rating</th>
                          <th>edit</th>
                          <th>del</th>
                          <th>Requests</th>
                        </tr>
                      </thead>
                      
                      <tbody>
                        {this.state.isLoadingBook ? 
                            <Spinner animation="border" variant="primary" style={{marginLeft: "48rem", marginTop: "0.5rem"}}/>
                          :
                          this.state.books.map((book) => (
                            <tr>
                              <td style={{paddingTop: "0.5rem"}}>{book.date}</td>
                              <td style={{paddingTop: "0rem"}}>
                                  <Link className="nav-link" to={`/book/${book._id}`} style={{paddingLeft: 0, paddingRight: 0}}>
                                        {book.title}
                                  </Link>
                              </td>
                              <td style={{paddingTop: "0.5rem"}}>{book.author}</td>
                              <td style={{paddingTop: "0.5rem"}}>${book.price}</td>
                              <td style={{ paddingTop: "0.5rem"}}>
                                <Row onClick={() => {this.handleRateBook(book)}} style={{cursor: "pointer"}}>{createStar(book.rating.rating)}</Row>
                              </td>
                              
                              {this.isRequested(book._id) ? <td style={{paddingTop: "0.5rem"}}><img src={edit_no} alt="Edit Disabled" style={{ width: "1.5rem", padding: "0rem"}} /></td>
                                : <td><Button variant="light" onClick={()=>{this.handleEditBook(book)}}>
                                  <img src={edit} alt="Edit Book" style={{ width: "1.5rem", padding: "0rem" }} />
                                  </Button></td>}                       
                              <td>
                                  <Button variant="light" onClick={() => {this.handleDeleteBook(book)}}>
                                    <img src={delIcon} alt="Delete Book" style={{ width: "1.5rem", padding: "0rem" }} />
                                  </Button>
                              </td>
                              <td style={{paddingTop: "0.5rem", paddingLeft: "3rem"}}>{createRequestsCol(this.isRequested(book._id))}</td>
                            </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div style={{marginLeft: "10%", marginTop: "0.5rem", background: "#FFFFE0", width: "20%", textAlign: "center", borderRadius: "1rem", padding: "0.5rem"}}>
                      <h3>E-Books</h3>
                    </div>     
                    <Table className="myTable" size="sm" style={{ width: "80%", marginTop: "1.5rem", marginLeft: "auto", marginRight: "auto", paddingTop: "1rem"}}>
                      <thead>
                        <tr>
                          <th>Date Added</th>
                          <th>Title</th>
                          <th>Rating</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      
                      <tbody>
                        {this.state.isLoadingEBook ? 
                            <Spinner animation="border" variant="primary" style={{marginLeft: "48rem", marginTop: "0.5rem"}}/>
                          :
                          this.state.ebooks.map((book) => (
                            <tr>
                              <td style={{paddingTop: "0.5rem"}}>{book.date}</td>
                              <td style={{paddingTop: "0.5rem", paddingLeft: 0, paddingRight: 0}}>
                                  {book.title}
                              </td>
                              <td style={{ paddingTop: "0.5rem"}}>
                                <Row onClick={() => {this.handleRateBook(book)}} style={{width: "fit-content", paddingLeft: "2rem", cursor: "pointer"}}>{createStar(book.rating.rating)} ({book.rating.rating})</Row>
                              </td>                   
                              <td>
                                  <Button variant="link" onClick={()=> {this.openEbook(book.file)}}>Read</Button>
                              </td>
                              </tr>
                        ))}
                      </tbody>
                      <Button variant="info" onClick={this.handleAddBook} style={{marginTop: "2rem"}}>Add Books</Button>
                    </Table>

                    <div style={{marginLeft: "10%", marginTop: "2rem", background: "#eeeeee", width: "25%", textAlign: "center", borderRadius: "4rem", padding: "0.6rem"}}>
                      <h1 style={{fontSize: "2rem"}}>Received Requests</h1>
                    </div>
                    <Table className="myTable" size="sm" style={{ width: "80%", marginTop: "1.5rem", marginLeft: "auto", marginRight: "auto", marginBottom: "3rem", paddingTop: "1rem"}}>
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
                        {this.state.isLoadingRequest ? 
                          <Spinner animation="border" variant="primary" style={{marginLeft: "48rem", marginTop: "0.3rem"}}/>
                          :
                          this.state.receivedRequests.map((request) => (
                            <tr>
                              <td>{request.date}</td>
                              <td>
                                  <Link className="nav-link" to={`/book/${request.book._id}`} style={{padding: 0}}>
                                    {request.bookTitle}
                                  </Link>
                              </td>
                              <td>
                                <Link className="nav-link" to={`/seller/${request.sender.userID}`} style={{padding: 0}}>
                                  {request.sender.userID}
                                </Link>
                              </td>
                                {request.status === "pending" ? <td>
                                <Button onClick={() => {this.handleRequest(request, 'acceptRequest')}} variant="outline-primary" size="sm" style={{marginLeft:"0.2rem", fontWeight: "bold"}}>Accept</Button>
                                <Button onClick={() => {this.handleRequest(request, 'declineRequest')}} variant="outline-danger" size="sm" style={{marginLeft:"0.2rem", fontWeight: "bold"}}>Decline</Button>
                                </td>:
                                  <td>Done</td>
                                }
                              
                              <td>
                                {request.status}
                              </td>
                            </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div key="footer" style={{height: "30px", marginTop: "3rem"}}></div>
                  </React.Fragment>
                
            </div> 
          )
    }
}

export default MyBookstore;
