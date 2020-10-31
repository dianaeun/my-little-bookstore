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
        books: []
    }
    static contextType = AuthContext;
    componentDidMount() {
      this.fetchBooks();
    }
    // books = [
    //   { date: '2019/09/04', title: 'Harry Potter and the Philosopher', author: 'J.K. Rowling', price: 15.00, rate: 5 , publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A", Title1: "An extremely powerful story of a young Southern Negro,", hycomment: " from his late high school days through three years of college to his life in Harlem. His early training prepared him for a life of humility before white men, but through injustices- large and small, he came to realize that he was an invisible man. People saw in him only a reflection of their preconceived ideas of what he was, denied his individuality, and ultimately did not see him at all. This theme, which has implications far beyond the obvious racial parallel, is skillfully handled. The incidents of the story are wholly absorbing. The boys dismissal from college because of an innocent mistake, his shocked reaction to the anonymity of the North and to Harlem, his nightmare experiences on a one-day job in a paint factory and in the hospital, his lightning success as the Harlem leader of a communistic organization known as the Brotherhood, his involvement in black versus white and black versus black clashes and his disillusion and understanding of his invisibility- all climax naturally in scenes of violence and riot, followed by a retreat which is both literal and figurative. Parts of this experience may have been told before, but never with such freshness, intensity and power. This is Ellisons first novel, but he has complete control of his story and his style. Watch it.", Title2: "YOU. ARE. THE. DEAD. Oh my God. ", dayecomment: " YOU. ARE. THE. DEAD. Oh my God. I got the chills so many times toward the end of this book. It completely blew my mind. It managed to surpass my high expectations AND be nothing at all like I expected. Or in Newspeak Double Plus Good. Let me preface this with an apology. If I sound stunningly inarticulate at times in this review, I can't help it. My mind is completely fried. This book is like the dystopian Lord of the Rings, with its richly developed culture and economics, not to mention a fully developed language called Newspeak, or rather more of the anti-language, whose purpose is to limit speech and understanding instead of to enhance and expand it. The world-building is so fully fleshed out and spine-tinglingly terrifying that it's almost as if George travelled to such a place, escaped from it, and then just wrote it all down. I read Fahrenheit 451 over ten years ago in my early teens. At the time, I remember really wanting to read 1984, although I never managed to get my hands on it. I'm almost glad I didn't. Though I would not have admitted it at the time, it would have gone over my head. Or at the very least, I wouldn't have been able to appreciate it", request: []},
    //   { date: '2019/09/04',title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', price: 16.00, rate: 5 , publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A", Title1: "Exciting", hycomment: "This book is really interesting. I really recommend to buy this book!", Title2: "Fantasy is alwasys good", dayecomment: "Easy to read", request: []},
    //   { date: '2019/09/28',title: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling', price: 15.00, rate: 4, publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A", Title1: "Do not forget?", hycomment: "Harry poter is impressive", Title2: "Still reading", dayecomment: "so interesting to read", request: [{sender: "Hyeon Joon Lee", date: "2020/05/30"}]},
    //   { date: '2020/01/05',title: 'Harry Potter and the Order of the Phoenix', author: 'J.K. Rowling', price: 17.00, rate: 5, publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A", Title1: "You won't regret", hycomment: "to buy Harry poter series", Title2: "Order this book now", dayecomment: "you won't regret", request: []},
    //   { date: '2020/05/17',title: 'Harry Potter and The Goblet of Fire', author: 'J.K. Rowling', price: 20.00, rate: 3 , publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A", Title1: "What am I going to talk ", hycomment: "...", Title2: "Nothing to say", dayecomment: "Incredible", request: []},
    //   { date: '2020/06/25',title: 'Harry Potter and the Half-Blood Prince', author: 'J.K. Rowling', price: 10.00, rate: 4, publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A" , Title1: "who is the main character", hycomment: "Harry poter?", Title2: "No", dayecomment: "That is secret", request: [{sender: "Daye Eun", date: "2020/10/12"}]},
    //   { date: '2020/07/30',title: 'Harry Potter and the Deathly Hallows – Part 1', author: 'J.K. Rowling', price: 13.00, rate: 4, publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A" , Title1: "Nothing to mention", hycomment: "No idea", Title2: "Let's skip", dayecomment: "okay?", request: []},
    //   { date: '2020/08/01',title: 'Harry Potter and the Deathly Hallows – Part 2', author: 'J.K. Rowling', price: 30.00, rate: 3, publisher: "Bloomsbury", isbn: "9781408883730", genre: "fantasy", description: "N/A" , Title1: "Test!", hycomment: "Okay test", Title2: "Last commnet", dayecomment: "Success", request: []},
    // ];
    fetchBooks() {
      const requestBody = {
          query: `
              query{
                  userBooks(ownerID: "${this.context.userId}"){
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
      this.setState({deleteBook: false, addBook: false, editBook: false});
      this.fetchBooks();
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
                <DeleteBookModal show={this.state.deleteBook} handleClose={this.handleClose}/>
                {this.state.bookSelected && <EditBookModal show={this.state.editBook} handleClose={this.handleClose} book={this.state.bookSelected}/>}
                {/* <Jumbotron fluid style={{height: "7rem", fontSize: "1rem", padding: "0rem"}}>
                  <Container style={{padding: "2rem"}}>
                    <h1>DongHun's Bookstore</h1>
                  </Container>
                </Jumbotron> */}
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
                        <td>
                            <Link className="nav-link" style={{padding: "0rem", paddingTop: "0.3rem"}} to={{pathname: "/IndividualBookpage" , book:book}} >{book.title}</Link>
                        </td>
                        <td style={{paddingTop: "0.5rem"}}><Link href="#">{book.author}</Link></td>
                        <td style={{paddingLeft: "2rem", paddingTop: "0.5rem"}}>${book.price}</td>
                        {this.createStar(book.rating)}                  
                        {book.requests.length ? <td style={{paddingLeft: "1.1rem", paddingTop: "0.5rem"}}><img src={edit_no} alt="Edit Disabled" style={{ width: "1.5rem", padding: "0rem"}} /></td>
                          : <td><Button variant="light" onClick={()=>{this.handleEditBook(book)}}>
                            <img src={edit} alt="Edit Book" style={{ width: "1.5rem", padding: "0rem" }} />
                            </Button></td>}                       
                        <td>
                            <Button variant="light" onClick={this.handleDeleteBook}>
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
