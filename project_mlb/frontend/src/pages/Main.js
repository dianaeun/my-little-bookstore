import React, { Component } from "react";
import { Badge, Table, Button, Row } from "react-bootstrap";
import MlbNavbar from '../components/NavigationBar.js'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const star = require("../icons/star.png");
const blankStar = require("../icons/blank_star.png");
class Main extends Component {
  state={books:[], genres: []}
  static contextType = AuthContext;
  componentDidMount() {
    this.fetchGenres();
    this.fetchBooks();
  }
  fetchGenres() {
    if (this.context.userID === null)
      return;
    console.log(this.context.userID);
    const requestBody = {
      query: `
          query{
              findByUserID(userID: "${this.context.userID}"){
                  userID
                  preferredGenres
                  location
              }
          }
      `
    }
    fetch('http://localhost:8000/graphql', {method: 'POST', body: JSON.stringify(requestBody), headers: {'Content-Type': 'application/json'}})
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to fetch User")
        }
        return res.json()
    })
    .then(resData => {
      console.log("User successfully fetched! ", resData);
      const user = resData.data.findByUserID;
      console.log(user.preferredGenres);
      this.setState({genres: user.preferredGenres});
  })
  }
  fetchBooks() {
      const requestBody = {
          query: `
              query{
                  books{
                      title
                      author
                      publisher
                      rating
                      genre
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
          const books = resData.data.books;
          books.sort((a, b) => b.rating - a.rating);
          // let selectedBooks = books.slice(0,10);
          // console.log(selectedBooks);
          this.setState({books: books});
      })
      .catch(err => { console.log(err);});
  };
    
  createStar = (n) => {
    let stars = [];
    for (let i = 0; i < n; i++){
        stars.push(<img src={star} alt="star" style={{ width: "22px" }} />);
    }
    for (let i = n; i < 5; i++) {
        stars.push(<img src={blankStar} alt="star" style={{ width: "22px" }} />);
    }
    return stars;
  }
  render() {
    return (
      <div>
        <MlbNavbar/>

        <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
          <Badge
            style={{
              fontFamily: "Kurale",
              paddingLeft: "50px",
              paddingRight: "50px",
              background: "#22525F",
              paddingTop: "10px",
              paddingBottom: "10px",
              color: "#FAC917",
            }}
          >
            Recommended Books
          </Badge>
        </h1>
          <div style={{ width: "800px", marginLeft: "auto", marginRight: "auto"}}>
            {this.context.userID !== null ? 
              <h3 style={{ fontFamily: "Kurale", textAlign: "center", marginTop: "2rem", marginBottom: "1rem"}}>
                {this.state.genres.map((genre) => (
                  <Button variant="outline-danger" size="sm" style={{marginRight:"0.7rem"}} disabled>{genre}</Button>
                ))}
                books in Songo
              </h3>
              :
              <h3 style={{ fontFamily: "Kurale", textAlign: "center", marginTop: "2rem", marginBottom: "1rem"}}>
                Books in Songo with Highest Ratings
              </h3>
            }
            <Table size="sm">
              <thead>
                <tr style={{fontFamily: "serif"}}>
                  <th></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publisher</th>
                  <th>Genre</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {this.context.token ? this.state.books.filter(book => book.genre.split(',').filter(genre => this.state.genres.includes(genre)).length > 0).slice(0,10).map((book, i) => (
                  <tr>
                    <td>{i+1}</td>
                    <td><Link href="#">{book.title}</Link></td>
                    <td><Link href="#">{book.author}</Link></td>
                    <td>
                      {book.publisher}
                    </td>
                    <td>{book.genre.split(",").map((genre) => (
                      <Button variant="outline-danger" size="sm" style={{marginRight:"0.5rem"}} disabled>{genre}</Button>
                    ))}</td>
                    <td style={{width:"8rem"}}>
                      {this.createStar(book.rating)}
                    </td>
                  </tr>  
                ))
                :
                this.state.books.slice(0,10).map((book, i) => (
                  <tr>
                    <td>{i+1}</td>
                    <td><Link href="#">{book.title}</Link></td>
                    <td><Link href="#">{book.author}</Link></td>
                    <td>
                      {book.publisher}
                    </td>                    
                    <td>{book.genre!=="" && book.genre.split(",").map((genre) => (
                      <Button variant="outline-danger" size="sm" style={{marginRight:"0.5rem"}} disabled>{genre}</Button>
                    ))}</td>
                    <td style={{width:"8rem"}}>
                      {this.createStar(book.rating)}
                    </td>
                  </tr>))   
                }
              </tbody>
            </Table>
          </div>
      </div>
    );
  }
}

export default Main;
