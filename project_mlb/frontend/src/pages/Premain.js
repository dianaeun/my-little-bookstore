import React, { Component } from "react";
import { Button} from "react-bootstrap";
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
      <div style={{ background: "#22525F", height: "100%"}}>
          <div style={{ textAlign: "center", height: "80%" }}>
            <h1
              style={{ fontFamily: "cursive", color: "white", paddingTop: "10%" }}
            >
              Welcome to <br />
              <i>My Little Bookstore</i>
            </h1>
            <img
              src={book}
              alt="book"
              style={{ width: "100px", margin: "20px" }}
            />
            <div>
              <Button
                style={{
                  width: "fit-content",
                  margin: "15px",
                  background: "#117BC8",
                  fontSize: "1.2rem"
                }}
              >
                Learn
              </Button>
              <Button
                style={{
                  width: "fit-content",
                  margin: "15px",
                  background: "#117BC8",
                  fontSize: "1.2rem"
                }}
                onClick={this.redirectHandler}
              >
                Get Started
              </Button>
              {this.renderRedirect()}
            </div>
            <p style={{color: "white", fontSize: "1.2rem", fontStyle: "italic", paddingTop: "1rem"}}>An online community for people who love or want to sell / buy books</p>      
        </div>
      </div>
    );
  }
}

export default Premain;
