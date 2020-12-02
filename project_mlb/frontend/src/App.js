import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Main from "./pages/Main";
import Browse from "./pages/Browse";
import MyBookstore from "./pages/MyBookstore";
import Discussion from "./pages/Discussion";
import Profile from "./pages/Profile";
import IndividualBookpage from "./pages/IndividualBookpage";
import Login from "./pages/Login";
import AuthContext from './context/AuthContext';
import Premain from './pages/Premain';
import Signup from './pages/Signup';
import SellerBookstorePage from './pages/SellerBookstorePage';

class App extends Component {
  state = {
    token: null,
    firstName: null,
    preferredGenres: null,
    userEmail: null,
    userID: null,
    user_id: null
  }
  login = (token, firstName, preferredGenres, userEmail, userID, user_id, tokenExpiration) => {
    this.setState({token: token, firstName: firstName, preferredGenres: preferredGenres, userEmail: userEmail, userID: userID, user_id: user_id});
  }
  logout = () => {
    this.setState({token: null, firstName: null, preferredGenres: null, userEmail: null, userID: null, user_id: null});
  }
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <AuthContext.Provider
              value ={{
                token: this.state.token,
                firstName: this.state.firstName,
                preferredGenres: this.state.preferredGenres,
                login: this.login,
                logout: this.logout,
                userID: this.state.userID,
                user_id: this.state.user_id,
                userEmail: this.state.userEmail
              }}>
                <main className="vh-100" style={{fontFamily: "Kurale"}}>
                  <Switch>
                    <Route exact path="/" component={Premain} /> 
                    {!this.state.token && <Route exact path='/Login' component={Login}/>}
                    {!this.state.token && <Route exact path='/Signup' component={Signup}/>}
                    <Route exact path='/Main' component={Main} />
                    <Route exact path='/Browse' component={Browse} />
                    {this.state.token && <Route exact path='/MyBookstore' component={MyBookstore} />}
                    <Route exact path='/Discussion' component={Discussion} />
                    {this.state.token &&  <Route exact path='/Profile' component={Profile} />}
                    <Route path='/book/:book_id' component={IndividualBookpage} />
                    <Route path='/seller/:user_id' component={SellerBookstorePage} />

                    {/* <Route path='/MyBookstore/book/:book_id' component={IndividualBookpage} />
                    <Route path='/Main/book/:book_id' component={IndividualBookpage} />
                    <Route path='/Browse/book/:book_id' component={IndividualBookpage} />

                    <Route path='/Main/seller/:user_id' component={SellerBookstorePage} />
                    <Route path='/Main/seller/:user_id' component={SellerBookstorePage} />

                    <Route path='/Browse/seller/:user_id' component={SellerBookstorePage} /> */}

                    <Redirect to="/Main" />
                  </Switch>
                </main>
          </AuthContext.Provider>    
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
