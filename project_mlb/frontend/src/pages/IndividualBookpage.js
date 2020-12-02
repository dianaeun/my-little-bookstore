import React, {Component} from 'react';
import {Collapse,Button, Table, Card, CardDeck, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

import AddReview from '../components/AddReview';
import RequestModal from '../components/RequestModal';
import MlbNavbar from '../components/NavigationBar.js'
import AuthContext from '../context/AuthContext';
import RateBookModal from '../components/RateBookModal';

const star = require("../icons/star.png");
const defaultImg = require("../icons/ImageNotAvailable.png");
const blankStar = require("../icons/blank_star.png");

async function fetchBook(bookID){
  let book = null;
  const requestBody = {
      query: `
          query{
              findByBookID(bookID: "${bookID}"){
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
                price
                genre
                image
                isbn
                description                    
              }
          }
      `
  }
  await fetch('/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
  .then(res => {
      if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to fetch books!")
      }
      return res.json()
  })
  .then(resData => {
      console.log("Books are successfully fetched! ", resData);
      book = resData.data.findByBookID;
      console.log("Book: ", book);
  })
  .catch(err => { console.log(err);});
  return book;
};

// async function fetchSameBooks(title){
//   let sameBooks = null;
//   const requestBody = {
//     query: `
//         query{
//           sameBooks(bookTitle: "${title}"){
//             _id
//             date
//             title
//             author
//             publisher
//             rating{
//               rating
//               ratingSum
//               raters
//             }
//             price
//             genre
//             owner{
//               _id
//               userID
//               email
//             }
//           }
//         }
//     `
//   };
//   fetch('/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
//   .then(res => {
//     if (res.status !== 200 && res.status !== 201) {
//         throw new Error("Failed to fetch requests!")
//     }
//     return res.json()
//   })
//   .then(resData => {
//       console.log("Received Requests are successfully fetched", resData);
//       sameBooks = resData.data.sameBooks;
//       console.log(sameBooks);
//   })
//   return sameBooks;
// }

class IndividualBookpage extends Component{
    state = {
        book: null,
        rateBook: false,
        addReview: false,
        request: false,
        isLoading: false,
        sameBooks: [],
        isLoadingReviews: false,
        reviews: [],
        shownReviews: []
    }
    constructor(){
        super();
    }
    static contextType = AuthContext;
    componentDidMount() {
      this.fetchBook()
      // this.fetchSameBooks();
      // this.fetchReviews();
    }
    fetchBook = () => {
      const bookID = this.props.match.params.book_id;
      console.log("bookID:", bookID);
      fetchBook(bookID).then(book => {
        console.log(book);
        this.setState({book: book});
        return book.title;
      })
      .then(() => {
        this.fetchSameBooks()
        this.fetchReviews()
      })

    }
    toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
    }
    createStar = (n) => {
      let rounded = Math.round(n);
      let stars = [];
      for (let i = 0; i < rounded; i++){
          stars.push(<img src={star} alt="star" style={{ width: "22px" }} />);
      }
      for (let i = rounded; i < 5; i++) {
          stars.push(<img src={blankStar} alt="star" style={{ width: "22px" }} />);
      }
      return stars;
    }
    handleClose = () => {
      if(this.state.addReview) {
        this.fetchReviews();
      }
      this.setState({addReview: false, request: false});
    }
    handleCloseRating = () => {
      this.setState({rateBook: false});
    }
    handleAddReview = () => {
      if (this.context.userID === null){
        alert("You must login first!");
        return;
      }
      this.setState({addReview: true});
    }
    handleRequest = (book) => {
      this.setState({request: true});
      const requestBody = {
        query: `
              mutation CreateRequest($bookTitle: String!, $book: ID!, $sender: ID!, $receiver: ID!, $status: String!, $date: String!){
                  createRequest(requestInput: {bookTitle: $bookTitle, book: $book, sender: $sender, receiver: $receiver, status: $status, date: $date}) {
                      _id
                  }
              }
          `,
          variables: {
              bookTitle: book.title,
              book: book._id,
              sender: this.context.user_id,
              receiver: book.owner._id,
              status: "pending",
              date: new Date()
          }
      };
      fetch('/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed to fetch requests!")
        }
        return res.json()
      })
      .then(resData => {
          console.log("Create Requests are successfully fetched", resData);
          
      })
    }

    fetchSameBooks = () => {
      console.log(this.context.user_id);
      this.setState({isLoading: true});
      const requestBody = {
        query: `
            query{
              sameBooks(bookTitle: "${this.state.book.title}"){
                _id
                date
                title
                author
                publisher
                rating{
                  rating
                  ratingSum
                  raters
                }
                price
                genre
                owner{
                  _id
                  userID
                  email
                }
              }
            }
        `
      };
      fetch('/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed to fetch requests!")
        }
        return res.json()
      })
      .then(resData => {
          console.log("Received Requests are successfully fetched", resData);
          const sameBooks = resData.data.sameBooks;
          console.log(sameBooks);
          this.setState({sameBooks: sameBooks, isLoading: false});
      })
    }
    fetchReviews() {
      this.setState({isLoadingReviews: true});
      console.log("While fetching Reviews:", this.state.book);
      const requestBody = {
        query: `
            query{
              bookReviews(bookID: "${this.state.book.title}"){
                _id
                reviewer
                bookTitle
                date
                title
                content
              }
            }
        `
      }
      fetch('/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to fetch reviews!")
        }
        return res.json()
      })
      .then(resData => {
        console.log("Reviews are successfully fetched! ", resData);
        const reviews = resData.data.bookReviews;
        console.log(reviews);
        this.setState({reviews: reviews, baseReviews: reviews, isLoadingReviews: false});
      })
      .catch(err => { console.log(err);});
    }
    handleShowReview = (target) => {
      let shown = this.state.shownReviews;
      let index = shown.indexOf(target);
      if (index === -1) {
        shown.push(target);
      } else shown.splice(index, 1);
      this.setState({ shownReviews: shown });
    };
    handleRateBook = (book) => {
      console.log(book);
      if (book.rating.raters.includes(this.context.user_id)){
        alert("Already Rated This Book!!");
        return;
      }
      this.setState({rateBook: true});
    }
    render(){
        return (
          <React.Fragment>
            <MlbNavbar/>
            {this.state.book &&
              <div>
                <RateBookModal show={this.state.rateBook} handleClose={this.handleCloseRating} book={this.state.book} fetchBooks={this.fetchSameBooks}/>
                <AddReview show={this.state.addReview} handleClose={this.handleClose} reviewer={this.context.userID} book={this.state.book.title}/>
                  <RequestModal show={this.state.request} handleClose={this.handleClose}/>
                  <div style={{marginLeft: "2%", marginTop: "2rem", background: "#eeeeee", width: "30%", textAlign: "center", borderRadius: "4rem", padding: "0.6rem"}}>
                    <h1 style={{fontSize: "2rem"}}>Book Information</h1>
                  </div>

                  <CardDeck>
                    <Card className="text-center" style={{ marginLeft: "3%",flex: "1", marginTop: "2rem", background: "#CEE4E9"}}>
                      <Card.Body>
                        <Card.Title><b>{this.state.book.title}</b></Card.Title>
                        <Card.Img variant="top" src={this.state.book.image === "" ? defaultImg : this.state.book.image} style={{ width: "20rem", padding: "1rem"}} />
                        <Table className="myTable" size="sm">
                          <tr><td><b>AUTHOR:</b> </td><td>{this.state.book.author}</td></tr>
                          <tr><td><b>PUBLISHER:</b> </td><td>{this.state.book.publisher}</td></tr>
                          <tr><td><b>ISBN13:</b> </td><td>{this.state.book.isbn || 'N/A'}</td></tr>
                          <tr><td><b>GENRE:</b> </td><td>{this.state.book.genre || 'N/A'}</td></tr>
                          <tr>
                            <td><b>RATING:</b></td>
                            <td style={{ paddingTop: "0.5rem"}}>
                              <Row onClick={() => {this.handleRateBook(this.state.book)}} style={{width: "fit-content", paddingLeft: "6rem", cursor: "pointer"}}>
                                {this.createStar(this.state.book.rating.rating)} 
                                ({this.state.book.rating.rating})
                              </Row>
                            </td>
                          </tr>
                          <tr><td><b>DESCRITION:</b> </td><td>{this.state.book.description || 'N/A'}</td></tr>
                        </Table>
                      </Card.Body>
                    </Card>

                    <Card className="text-center" style={{flex: "2", marginTop: "2rem"}}>
                      <Card.Body>
                        <Card.Title><h3>BOOKSTORE OFFERS</h3></Card.Title>                    
                        <Table className="myTable" size="sm" style={{marginTop: "1rem"}}>
                          <thead style={{ marginTop: "4rem" }}>
                            <tr>
                              <th style={{width: '30%'}}>BOOKSTORE NAME</th>
                              <th style={{width: '20%'}}>DATE</th>
                              <th style={{width: '20%'}}>PRICE </th>
                              <th style={{width: '30%'}}>PURCHASE REQUEST</th>                    
                            </tr>
                          </thead>
                          <tbody style={{  marginTop: "2rem" }}>
                            {this.state.sameBooks && this.state.sameBooks.map((book) => (
                              <tr>
                                <td>
                                  <Link className="nav-link" to={`/seller/${book.owner.userID}`} style={{padding: 0}}>
                                    {book.owner.userID}'s BOOKSTORE
                                  </Link>
                                </td>
                                <td>{book.date}</td>
                                <td>$ {book.price}</td>
                                {book.owner._id === this.context.user_id ? <td>-</td> : <td><Button variant="info" onClick={() => this.handleRequest(book)}> BUY</Button></td>}
                              </tr>
                            ))}
                          </tbody>                    
                        </Table>
                      </Card.Body>
                        
                      <Card.Title style={{marginBottom: "0rem"}}><h3>REVIEWS</h3></Card.Title>      
                      <Card.Body>             
                        <Table size="sm" style={{margin: "0rem"}}>
                          <thead style={{ textAlign: "center", marginTop: "0rem" }}>
                              <tr>
                                <th style={{width: '30%'}}>REVIEWER</th>
                                <th style = {{ width: "40%"}}>CONTENT </th> 
                                <th></th>                  
                              </tr>
                          </thead>
                          <tbody style={{ textAlign: "center", marginTop: "2rem" }}>
                            {this.state.reviews && this.state.reviews.map((review, i) => (
                                <tr>
                                  <td>{review.reviewer}</td>
                                  <td>{review.title}
                                <div>
                                <div style={this.state.shownReviews.includes(i + "") ? {marginLeft: "1rem", marginTop: "1rem"} : { display: "none"}}>
                                  {review.content}
                                </div>
                                  </div>
                                  </td>
                                  <td>
                                  <Button id={"button" + i} variant="info" onClick={() => this.handleShowReview(i+"")}> {this.state.shownReviews.includes(i + "") ? 'Hide' : 'Read'}</Button>
                                  </td>
                                  </tr>
                              ))}   
                          </tbody>
                        </Table>
                        <h5 style={{ textAlign: "center", marginTop: "3.5rem",marginBottom:"2rem" }}>                            
                          <Button variant="info" style={{ fontWeight: "bold", marginLeft: "1rem", color: "#FAC917", background: "#22525F"}} onClick={this.handleAddReview}>Add Review</Button>
                        </h5>
                      </Card.Body>
                    </Card>
                  </CardDeck>
              </div>
            }
            
          </React.Fragment>
        );
    }
}

export default IndividualBookpage;


