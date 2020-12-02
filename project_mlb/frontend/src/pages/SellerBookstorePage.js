import React, {Component} from 'react';
import {Button, Table, Spinner, Row, Container} from 'react-bootstrap';
import MlbNavbar from '../components/NavigationBar.js'
import {createStar} from './Main';

import { Link} from "react-router-dom";

async function findUser(userID){
    let user = null;
    const requestBody = {
        query: `
            query{
              findByUserID(userID: "${userID}"){
                _id
                firstName
                lastName
                email
                userID
                location
                preferredGenres
              }
            }
        `
      }
      await fetch('/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed to fetch user!")
        }
        return res.json()
      })
      .then(resData => {
          console.log("User info successfully fetched", resData);
          user = resData.data.findByUserID;
          console.log(user);
      })
      return user;
}

class SellerBookstorePage extends Component{
    state = {
        isLoading: false,
        user : null,
        books : null,
        userInfo : []
    }
     
    fetchUser = () => {
        this.setState({isLoading: true});
        const userID = this.props.match.params.user_id;
        console.log("userID:", userID);
        findUser(userID)
        .then(user => {
            console.log("find user!", user);
            this.setState({user: user, isLoading: false});
            return user
        })
        .then(user => {
            this.fetchBooks(user._id)
        })
    }
    fetchBooks = (ownerID) => {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
                query{
                    userBooks(ownerID: "${ownerID}"){
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
            console.log("Books are successfully fetched! ", resData);
            const books = resData.data.userBooks;
            console.log("Books: ", books);
            this.setState({books: books, isLoading: false});
        })
        .catch(err => { console.log(err);});
      };
    componentDidMount() {
        this.fetchUser();
      }
    render(){
        return(
            <React.Fragment>
                <MlbNavbar/>
                {this.state.isLoading && <Spinner animation="border" variant="primary" style={{marginLeft: "48rem", marginTop: "0.5rem"}}/>}
                {this.state.user &&
                    <React.Fragment>
                        <div style={{marginLeft: "10%", marginTop: "2rem", background: "#eeeeee", width: "25%", textAlign: "center", borderRadius: "4rem", padding: "0.6rem"}}>
                            <h1 style={{fontSize: "2rem"}}>{this.state.user.firstName}'s Bookstore</h1>
                        </div>
                        <Container style={{marginLeft: "10%",  marginTop: "2rem", width: "19rem", textAlign: "center", background: "#FFFFE0", borderRadius: "4rem", padding: "0.3rem"}}>
                            <h4>Personal Information</h4>
                        </Container>
                        <Table size="sm" style={{ minWidth: "900px", maxWidth: "1100px", marginLeft: "10%", marginRight: "auto", marginTop: "1.2rem"}}>
                            <tr><td>Name </td><td>{this.state.user.firstName + " " + this.state.user.lastName}</td></tr>
                            <tr><td>User ID </td><td>{this.state.user.userID}</td></tr>
                            <tr><td>Location </td><td>{this.state.user.location}</td></tr>
                            <tr><td>Email </td><td>{this.state.user.email}</td></tr>
                            <tr><td>Preference </td><td>{this.state.user.preferredGenres.map(genre => (
                                <Button variant="outline-danger" size="sm" style={{marginLeft:"0.2rem"}} disabled>{genre}</Button>
                            ))}</td></tr>
                        </Table>

                        <Container style={{marginLeft: "10%",  marginTop: "2rem", width: "19rem", textAlign: "center", background: "#FFFFE0", borderRadius: "4rem", padding: "0.3rem"}}>
                            <h4>Selling Books</h4>
                        </Container>
                        <Table className="myTable" size="sm" style={{ width: "80%", marginTop: "1.5rem", marginLeft: "auto", marginRight: "auto", paddingTop: "1rem"}}>
                            <thead>
                                <tr>
                                    <th>Date Added</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Price</th>
                                    <th style={{paddingLeft: "1.5rem"}}>Rating</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {this.state.books &&
                                    this.state.books.map((book) => (
                                        <tr>
                                        <td style={{paddingTop: "0.5rem"}}>{book.date}</td>
                                        <td style={{paddingTop: "0rem"}}>
                                            <Link className="nav-link" to={`/book/${book._id}`} style={{paddingLeft: 0, paddingRight: 0}}>
                                                {book.title}
                                            </Link>                                           
                                        </td>
                                        <td style={{paddingTop: "0.5rem"}}><Link href="#">{book.author}</Link></td>
                                        <td style={{paddingTop: "0.5rem"}}>${book.price}</td>
                                        <td style={{ paddingTop: "0.5rem"}}>
                                            <Row onClick={() => {this.handleRateBook(book)}} style={{width: "fit-content", paddingLeft: "2rem", cursor: "pointer"}}>{createStar(book.rating.rating)} ({book.rating.rating})</Row>
                                        </td>
                                        
                                
                                        </tr>
                                    ))}
                            </tbody>

                        
                        </Table>
                       

                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default SellerBookstorePage;
