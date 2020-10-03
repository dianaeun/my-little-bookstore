import React, { Component } from "react";
import { Badge, Table } from "react-bootstrap";

const star = require("../icons/star.png");
const blankStar = require("../icons/blank_star.png");
class Main extends Component {
  stars = [1, 2];
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: "30px" }}>
          <Badge
            style={{
              fontFamily: "fantasy",
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
        <br/>
          <div style={{textAlign: "center"}}>
            <h4 style={{ fontFamily: "cursive"}}>
              SF, Fantasy, Romance books in Songdo
            </h4>
          </div>
          <br/>
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
                <tr>
                  <td>1</td>
                  <td>Dune</td>
                  <td>Frank Herbert</td>
                  <td>SF & Fantasy</td>
                  <td>
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>A Witch In Time</td>
                  <td>Constance Sayers</td>
                  <td>SF & Fantasy</td>
                  <td>
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>The Sandman</td>
                  <td>Neil Gaiman</td>
                  <td>SF & Fantasy</td>
                  <td>
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Harry Potter and The Goblet of Fire</td>
                  <td>J.K. Rowling</td>
                  <td>SF & Fantasy</td>
                  <td>
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>59 Memory Lane</td>
                  <td>Celia Anderson</td>
                  <td>Romance</td>
                  <td>
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img
                      src={blankStar}
                      alt="blank star"
                      style={{ width: "22px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Playing With Fire</td>
                  <td>L.J. Shen</td>
                  <td>Romance</td>
                  <td>
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img src={star} alt="star" style={{ width: "22px" }} />
                    <img
                      src={blankStar}
                      alt="blank star"
                      style={{ width: "22px" }}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
      </div>
    );
  }
}

export default Main;
