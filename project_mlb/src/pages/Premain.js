import React, { Component } from "react";
import { Button } from "react-bootstrap";
import {Redirect} from "react-router";
// import { NavLink } from "react-router-dom";
const book = require("../icons/book.png");

class Premain extends Component {
  state = {
    redirect: false,
  };
  redirectHandler = () => {
    this.setState({ redirect: true });
    this.renderRedirect();
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/Main" />;
    }
  };
  render() {
    return (
      <div class="outer-container" style={{ background: "#56A2B5" }}>
        <div style={{ textAlign: "center" }}>
          <h2
            style={{ fontFamily: "cursive", color: "white", marginTop: "15%" }}
          >
            Welcome to <br />
            My Little Bookstore
          </h2>
          <img
            src={book}
            alt="book"
            style={{ width: "80px", margin: "20px" }}
          />
          <div>
            <Button
              style={{
                width: "110px",
                margin: "15px",
                background: "#117BC8",
              }}
            >
              Learn
            </Button>
            <Button
              style={{
                width: "110px",
                margin: "15px",
                background: "#117BC8",
              }}
              onClick={this.redirectHandler}
            >
              Get Started
            </Button>
            {/* <NavLink className="nav-link" to="/Main">Get Started</NavLink> */}
            {this.renderRedirect()}
          </div>
        </div>
      </div>
    );
  }
}

export default Premain;
