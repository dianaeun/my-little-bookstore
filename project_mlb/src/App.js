import React, {Component} from 'react';
import './App.css';
import MlbNavbar from './components/NavigationBar.js'
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from "./pages/Main";
import Browse from "./pages/Browse";
import MyBookstore from "./pages/MyBookstore";
import Discussion from "./pages/Discussion";
import Profile from "./pages/Profile";
import IndividualBookpage from "./pages/IndividualBookpage";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <MlbNavbar/>
          <Switch>
            <Route exact path='/Main' component={Main} />
            <Route exact path='/Browse' component={Browse} />
            <Route exact path='/MyBookstore' component={MyBookstore} />
            <Route exact path='/Discussion' component={Discussion} />
            <Route exact path='/Profile' component={Profile} />
            <Route path='/IndividualBookpage' component={IndividualBookpage} />
          </Switch> 
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
