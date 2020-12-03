import React, { Component } from "react";
import { Badge, Table, Button, Row } from "react-bootstrap";
import MlbNavbar from '../components/NavigationBar.js'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const star = require("../icons/star.png");
const blankStar = require("../icons/blank_star.png");

export const createStar = (n) => {
  n = Math.round(n);
  let stars = [];
  for (let i = 0; i < n; i++){
      stars.push(<img src={star} alt="star" style={{ width: "22px" }} />);
  }
  for (let i = n; i < 5; i++) {
      stars.push(<img src={blankStar} alt="star" style={{ width: "22px" }} />);
  }
  return stars;
}


class Main extends Component {
  state={books:[], genres: []}
  static contextType = AuthContext;
  componentDidMount() {
    console.log("match: ", this.props.match);
    this.fetchBooks();
  }
  
  fetchBooks() {
      const requestBody = {
          query: `
              query{
                  books{
                      _id
                      title
                      author
                      publisher
                      rating{
                        _id
                        rating
                      }
                      genre
                      owner{
                        firstName
                        lastName
                        email
                        userID
                        location
                        preferredGenres
                      }
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
          const books = resData.data.books;
          books.sort((a, b) => b.rating.rating - a.rating.rating);
          // let selectedBooks = books.slice(0,10);
          // console.log(selectedBooks);
          this.setState({books: books});
      })
      .catch(err => { console.log(err);});
  };
    
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
              <div style={{display: "inline-flex", flexDirection: "row", justifyContent: "center", marginLeft: "11rem"}}>
                <h3 style={{color: "#C71585", fontFamily: 'Caveat', textAlign: "center", marginTop: "2rem", marginBottom: "1rem"}}>
                  {this.context.preferredGenres.map((genre) => (
                    genre + "          "
                  ))}
                </h3>
                <h3 style={{ fontFamily: 'Kurale', textAlign: "center", marginTop: "2rem", marginBottom: "1rem", marginLeft: "1rem"}}>books in Songdo</h3>
              </div>
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
                  <th>Seller</th>
                  <th>Genre</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {this.context.token ? this.state.books.filter(book => book.genre.split(',').filter(genre => this.context.preferredGenres.includes(genre)).length > 0).slice(0,10).map((book, i) => (
                  <tr>
                    <td>{i+1}</td>
                      <Link className="nav-link" to={`/book/${book._id}`} style={{padding: "0rem", margin: "0rem", marginTop: "0.1rem"}}>
                            {book.title}
                      </Link>
                    <td>{book.author}</td>
                    <td>
                      {book.publisher}
                    </td>
                    <td>
                      <Link className="nav-link" to={`/seller/${book.owner.userID}`} style={{padding: "0rem"}}>
                        {book.owner.userID}
                      </Link>
                    </td>
                    <td>
                      <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                          {book.genre!=="" && book.genre.split(",").map((genre) => (
                            <p style={{color: "#C71585", fontFamily: 'Caveat', textAlign: "center", margin: "0rem"}}>{genre}</p>
                          ))}
                      </div>
                    </td>
                    <td style={{width:"8rem"}}>
                      {createStar(book.rating.rating)}
                    </td>
                  </tr>  
                ))
                :
                this.state.books.slice(0,10).map((book, i) => (
                  <tr>
                    <td>{i+1}</td>
                    <td>
                      <Link className="nav-link" to={`/book/${book._id}`} style={{padding: "0rem", margin: "0rem"}}>
                            {book.title}
                      </Link>
                    </td>
                    <td>{book.author}</td>
                    <td>
                      {book.publisher}
                    </td>          
                    <td>
                      <Link className="nav-link" to={`/seller/${book.owner.userID}`} style={{padding: "0rem"}}>
                        {book.owner.userID}
                      </Link>
                    </td>

                    <td>
                      <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                          {book.genre!=="" && book.genre.split(",").map((genre) => (
                            <p style={{color: "#C71585", fontFamily: 'Caveat', textAlign: "center", margin: "0rem"}}>{genre}</p>
                          ))}
                      </div>
                    </td>
                    <td style={{width:"8rem"}}>
                      {createStar(book.rating.rating)}
                    </td>
                  </tr>))   
                }
              </tbody>
            </Table>
          </div>
          <div key="footer" style={{height: "30px", marginTop: "3rem"}}></div>
      </div>
    );
  }
}

export default Main;
