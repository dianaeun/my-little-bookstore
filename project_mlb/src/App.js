import React from 'react';
import './App.css';
import MlbNavbar from './components/NavigationBar.js'
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from "./pages/Main";
import Browse from "./pages/Browse";
import MyBookstore from "./pages/MyBookstore";
import Discussion from "./pages/Discussion";
import Profile from "./pages/Profile";
function App() {
  return (
    <div>
      <BrowserRouter>
        <MlbNavbar/>
        <Switch>
                  <Route exact path='/' component={Main} />
                  <Route exact path='/Browse' component={Browse} />
                  <Route exact path='/MyBookstore' component={MyBookstore} />
                  <Route exact path='/Discussion' component={Discussion} />
                  <Route exact path='/Profile' component={Profile} />
        </Switch> 
      </BrowserRouter>
    </div>
  );
}

export default App;
