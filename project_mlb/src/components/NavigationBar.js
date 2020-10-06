import React, { Component } from "react";
import { Navbar, Nav, NavItem, Button} from "react-bootstrap";
import { Link, NavLink} from "react-router-dom";
import LogoutModal from './LogoutModal';
import AuthContext from '../context/AuthContext';
const bookIcon = require('../icons/book.png');

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
  static contextType = AuthContext;

  render() {
    return (
      <div>
        <div style={{background: "#56a2b5", position: "relative"}}>
          <img src= {bookIcon} style={{width: "70px", position: "absolute", marginTop: "1rem", marginLeft: "1rem"}} alt="this is book" />
          <h1 style={{margin: 0, padding: "25px", textAlign: "center", fontFamily: "fantasy", color: "white", fontWeight: "bold" }}>
            My Little Bookstore
          </h1>
        </div>
        {this.context.isLogin && <LogoutModal show={this.state.show} handleClose={this.handleClose} logout={this.context.logout}/>}
        <Navbar style={{background: "#2E7384"}} >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavItem>  <Link className="nav-link" style={{color: "white", fontWeight: "bold", fontSize: "20px"}} to="/Main">Home</Link> </NavItem> 
              <NavItem>  <Link className="nav-link" style={{color: "white", fontWeight: "bold", fontSize: "20px"}} to="/Browse">Browse</Link> </NavItem> 
              {this.context.isLogin && <NavItem>  <Link className="nav-link" style={{color: "white", fontWeight: "bold", fontSize: "20px"}} to="/MyBookstore">My Bookstore</Link> </NavItem>}
              <NavItem>  <Link className="nav-link" style={{color: "white", fontWeight: "bold", fontSize: "20px"}} to="/Discussion">Discussion</Link> </NavItem>
              {this.context.isLogin && <NavItem>  <Link className="nav-link" style={{color: "white", fontWeight: "bold", fontSize: "20px"}} to="/Profile">Profile</Link> </NavItem>}
            </Nav>
            {!this.context.isLogin && <NavLink className="nav-link" to="/Login">Sign-up/Login</NavLink>}

            {this.context.isLogin && <Button onClick={this.handleOpen}>Logout</Button>}
            
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}


export default MlbNavbar;
