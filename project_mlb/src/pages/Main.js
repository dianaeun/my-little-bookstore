import React, { Component } from "react";
import { Badge, Table } from "react-bootstrap";
import MlbNavbar from '../components/NavigationBar.js'

const star = require("../icons/star.png");
const blankStar = require("../icons/blank_star.png");
class Main extends Component {
  books = [
    {title: "Dune", author: "Frank Herbert", genre: ["SF", "Fantasy"], rating: 5}, 
    {title: "A Witch in Time", author: "Constance Sayers", genre: ["SF", "Fantasy"], rating: 5},
    {title: "The Sandman", author: "Neil Gaiman", genre: ["SF", "Fantasy"], rating: 5},
    {title: "Harry Potter and the Goblet of Fire", author: "J.K. Rowling", genre: ["SF", "Fantasy"], rating: 5},
    {title: "59 Memory Lane", author: "Celia Anderson", genre: ["Romance"], rating: 4},
    {title: "Playing With Fire", author: "L.J. Shen", genre: ["Romance"], rating: 3},
  ];
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
        <h4 style={{ fontFamily: "Kurale", textAlign: "center", marginTop: "2rem", marginBottom: "2rem"}}>
          SF, Fantasy, Romance books in Songdo
        </h4>
          <div>
            <Table size="sm" style={{ width: "800px", marginLeft: "auto", marginRight: "auto"}}>
              <thead>
                <tr style={{fontFamily: "serif"}}>
                  <th></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {this.books.map((book, i) => (
                  <tr>
                    <td>{i+1}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre.join(", ")}</td>
                    <td>
                      {this.createStar(book.rating)}
                    </td>
                  </tr>                  
                ))}
              </tbody>
            </Table>
          </div>
      </div>
    );
  }
}

export default Main;
