import React, {Component} from 'react';
import {Collapse,Button, Table, Card, CardDeck } from "react-bootstrap";
import AddReview from '../components/AddReview';
import RequestModal from '../components/RequestModal';
import MlbNavbar from '../components/NavigationBar.js'
import AuthContext from '../context/AuthContext';

const star = require("../icons/star.png");
const harry = require("../icons/harrypotter.png");
const blankStar = require("../icons/blank_star.png");

class IndividualBookpage extends Component{
    state = {
        addReview: false,
        request: false,
        isLoading: false,
        sameBooks: [],
        isLoadingReviews: false,
        reviews: []
    }
    constructor(){
        super();
        this.state = { showText: false };
        this.state = { showText1: false};
    }
    static contextType = AuthContext;
    componentDidMount() {
      this.fetchSameBooks();
    }
    toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
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
    handleClose = () => {
        this.setState({addReview: false, request: false});
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

    fetchSameBooks() {
      console.log(this.context.user_id);
      this.setState({isLoading: true});
      const requestBody = {
        query: `
            query{
              sameBooks(bookTitle: "${this.props.location.book.title}"){
                _id
                date
                title
                author
                publisher
                rating
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
      this.setState({isLoading: true});
      //this.setState({isLoadingReviews: true});
      console.log(this.props.location.book);
      const requestBody = {
        query: `
            query{
              bookReviews(bookID: "${this.props.location.book.title}"){
                _id
                reviewer
                book
                date
                content
              }
            }
        `
      }
      fetch('/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to fetch discussions!")
        }
        return res.json()
      })
      .then(resData => {
        console.log("Reviews are successfully fetched! ", resData);
        const reviews = resData.data.reviews;
        this.setState({reviews: reviews, baseReviews: reviews, isLoading: false});
      })
      .catch(err => { console.log(err);});
    }

    render(){
        return (
          <React.Fragment>
            <MlbNavbar/>
            <div>
              <AddReview show={this.state.addReview} handleClose={this.handleClose} fetchReviews={this.fetchReviews} handleClose={this.handleClose} reviewer={this.context.userID} book={this.props.location.book.title}/>
                <RequestModal show={this.state.request} handleClose={this.handleClose}/>
                <div style={{marginLeft: "2%", marginTop: "2rem", background: "#eeeeee", width: "30%", textAlign: "center", borderRadius: "4rem", padding: "0.6rem"}}>
                  <h1 style={{fontSize: "2rem"}}>Book Information</h1>
                </div>

                <CardDeck>
                  <Card className="text-center" style={{ marginLeft: "3%",flex: "1", marginTop: "2rem", background: "#CEE4E9"}}>
                    <Card.Body>
                      <Card.Title><b>{this.props.location.book.title}</b></Card.Title>
                      <Card.Img variant="top" src={harry} style={{ width: "20rem", padding: "1rem"}} />
                      <Table className="myTable" size="sm">
                        <tr><td><b>AUTHOR:</b> </td><td>{this.props.location.book.author}</td></tr>
                        <tr><td><b>PUBLISHER:</b> </td><td>{this.props.location.book.publisher}</td></tr>
                        <tr><td><b>ISBN:</b> </td><td>{this.props.location.book.isbn}</td></tr>
                        <tr><td><b>GENRE:</b> </td><td>{this.props.location.book.genre}</td></tr>
                        <tr><td><b>RATE:</b> </td>{this.createStar(this.props.location.book.rate)}<Button>Rate</Button></tr>
                        <tr><td><b>DESCRITION:</b> </td><td>{this.props.location.book.description}</td></tr>
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
                              <td>{book.owner.userID}'s BOOKSTORE</td>
                              <td>{book.date}</td>
                              <td>{book.price}</td>
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
                          {this.state.reviews && this.state.reviews.map((review) => (
                              <tr>
                                <td>{review.reviewer.userID}</td>
                                <td>{this.state.sameBooks[0].title}
                              <div>
                              <Collapse in={this.state.showText}>
                                <div>
                                  <span>                          
                                  {review.comment}
                                </span>
                                </div>
                                  </Collapse>
                                </div>
                                </td>
                                <td>
                                <Button variant="info" onClick={() => this.setState({ showText: !this.state.showText })}> {this.state.showText ? 'Read less' : 'Read more'}</Button>
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
          </React.Fragment>
        );
    }
}

export default IndividualBookpage;


