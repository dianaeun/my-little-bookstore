import React, {Component} from 'react';
import './App.css';
import MlbNavbar from './components/NavigationBar.js'
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from "./pages/Main";
import Browse from "./pages/Browse";
import MyBookstore from "./pages/MyBookstore";
import Discussion from "./pages/Discussion";
import Profile from "./pages/Profile";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <MlbNavbar/>
          <Switch>
            <Route exact path='/Main' component={Main} />
            <Route  path='/Browse' component={Browse} />
            <Route  path='/MyBookstore' component={MyBookstore} />
            <Route  path='/Discussion' component={Discussion} />
            <Route  path='/Profile' component={Profile} />
          </Switch> 
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
