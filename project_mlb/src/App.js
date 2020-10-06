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
    isLogin: false
  }
  login = () => {
    this.setState({isLogin: true});
  }
  logout = () => {
    this.setState({isLogin: false});
  }
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <AuthContext.Provider
              value ={{
                isLogin: this.state.isLogin,
                login: this.login,
                logout: this.logout
              }}>
              <Switch>
                <Route exact path="/" component={Premain} /> 
                {!this.state.isLogin && <Route exact path='/Login' component={Login}/>}
                {!this.state.isLogin && <Route exact path='/Signup' component={Signup}/>}
                <Route exact path='/Main' component={Main} />
                <Route exact path='/Browse' component={Browse} />
                {this.state.isLogin && <Route exact path='/MyBookstore' component={MyBookstore} />}
                <Route exact path='/Discussion' component={Discussion} />
                {this.state.isLogin &&  <Route exact path='/Profile' component={Profile} />}
                <Route path='/IndividualBookpage' component={IndividualBookpage} />
                <Redirect to="/Main" />
              </Switch>
          </AuthContext.Provider>    
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
