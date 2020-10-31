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


class App extends Component {
  state = {
    token: null,
    userEmail: null,
    userId: null,
  }
  login = (token, userEmail, userId, tokenExpiration) => {
    this.setState({token: token, userEmail: userEmail, userId: userId});
  }
  logout = () => {
    this.setState({token: null, userEmail: null, userId: null});
  }
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <AuthContext.Provider
              value ={{
                token: this.state.token,
                login: this.login,
                logout: this.logout
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
                    <Route path='/IndividualBookpage' component={IndividualBookpage} />
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
