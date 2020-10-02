import React, { Component } from "react";
import { Badge, Table } from "react-bootstrap";

const Star = () => {
  return (
    <div className="star">
      <svg height="25px" width="25px" viewBox="0 0 25 23" fill="#FAC917">
        <polygon
          stroke-width="0"
          points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
        />
      </svg>
    </div>
  );
};
class Main extends Component {
  stars = [1, 2, 3, 4, 5];
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: "30px" }}>
          <Badge
            style={{
              fontFamily: "fantasy",
              padding: "30px",
              background: "#22525F",
              paddingTop: "10px",
              paddingBottom: "10px",
              color: "#FBE62F",
            }}
          >
            Recommended Books
          </Badge>
        </h1>
        <h4 style={{ fontFamily: "cursive" }}>
          SF, Fantasy, Romance books in Songdo
        </h4>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>Dune</td>
              <td>Frank Herbert</td>
              <td>SF & Fantasy</td>
              <td>
                <div class="flex-container">
                  {this.stars.forEach((star, i) => (
                    <Star/>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Main;
