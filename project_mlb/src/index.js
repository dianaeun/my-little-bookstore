import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import './index.css';
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login";
import Premain from "./pages/Premain";
import Signup from "./pages/Signup";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>        
        <Route exact path="/" component={Login} />
        <Route path="/Premain" component={Premain} />
        <Route path="/Signup" component={Signup} />
        <Route path="/Main" component={App} />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

