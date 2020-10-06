import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, BrowserRouter} from 'react-router-dom';



ReactDOM.render(
    // <React.StrictMode>
    //   <BrowserRouter>
    //       <Route exact path="/" component={Premain} /> 
    //       <Route exact path="/Main" component={App} /> 
    //       <Route path="/Main" component={Main} /> 
    //   </BrowserRouter>
    // </React.StrictMode>
    <App/>,
    document.getElementById('root')
  );
