import React, { Component } from "react";
import { Navbar, Button} from "react-bootstrap";
import { NavLink} from "react-router-dom";
import LogoutModal from './LogoutModal';
import AuthContext from '../context/AuthContext';
import './NavigationBar.css';
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
          <h1 style={{margin: 0, padding: "25px", textAlign: "center", color: "white", fontWeight: "bold", fontFamily: 'Kurale' }}>
            My Little Bookstore
          </h1>
        </div>
        {this.context.isLogin && <LogoutModal show={this.state.show} handleClose={this.handleClose} logout={this.context.logout}/>}
        <Navbar className="main-navigation__items " style={{background: "#2E7384", display: "flex", alignItems: "center", justifyContent: "space-between"}} >
            <div>
              <NavLink to="/Main"> Home </NavLink>
              <NavLink style={{marginLeft: "1rem"}}to="/Browse"> Browse </NavLink>
              <NavLink style={{marginLeft: "1rem"}}to="/Discussion"> Discussion </NavLink>
              {this.context.isLogin && <NavLink to="/MyBookstore"> My Bookstore </NavLink> }
              {this.context.isLogin && <NavLink to="/Profile"> Profile </NavLink> }
            </div>
            <div>
              {!this.context.isLogin && <NavLink className="nav-link" to="/Login" style={{fontSize: "1rem", background: "#22525F", border: "4px solid #ffffff", borderRadius: "1rem", padding: "0.1 0.4rem", color: "#FAC917"}}>Login</NavLink>}
              {this.context.isLogin && <Button onClick={this.handleOpen} style={{fontSize: "1rem", fontWeight: "bold", background: "#22525F", border: "4px solid #ffffff", borderRadius: "1rem", padding: "0.1 0.4rem", color: "#FAC917"}}>Logout</Button>}
            </div>

        </Navbar>
        
      </div>
    );
  }
}


export default MlbNavbar;
