import React, { Component } from "react";
import { Navbar, Nav, NavItem, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const bookIcon = require("../icons/book.png");

class MlbNavbar extends Component {
  state={
    show : false,
  }
  handleClose = () => {
    this.setState({show: false});
  }
  handleOpen = () => {
    this.setState({show: true});
  }

  render() {
     return (
      <div>
        <div style={{ background: "#56a2b5" }}>
          <h1
            style={{
              margin: 0,
              padding: "25px",
              fontFamily: "fantasy",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <div>
              <img
                src={bookIcon}
                style={{ width: "60px", float: "left" }}
                alt="this is book"
              />
            </div>
            <div style={{ textAlign: "center"}}>My Little Bookstore</div>
          </h1>
        </div>
        <Navbar style={{ background: "#2E7384" }}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavItem>
                {" "}
                <Link
                  className="nav-link"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  to="/"
                >
                  Home
                </Link>{" "}
              </NavItem>
              <NavItem>
                {" "}
                <Link
                  className="nav-link"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  to="/Browse"
                >
                  Browse
                </Link>{" "}
              </NavItem>
              <NavItem>
                {" "}
                <Link
                  className="nav-link"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  to="/MyBookstore"
                >
                  My Bookstore
                </Link>{" "}
              </NavItem>
              <NavItem>
                {" "}
                <Link
                  className="nav-link"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  to="/Discussion"
                >
                  Discussion
                </Link>{" "}
              </NavItem>
              <NavItem>
                {" "}
                <Link
                  className="nav-link"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  to="/Profile"
                >
                  Profile
                </Link>{" "}
              </NavItem>
            </Nav>
            <Button>Logout</Button>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MlbNavbar;
