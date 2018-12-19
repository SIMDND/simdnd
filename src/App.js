import React, { Component } from 'react';
import {HashRouter, Route, Switch, Redirect,Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './dux/store.js';
import About from './components/About/About.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Game from './components/Game/Game.js';
import User from './components/User/User.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <HashRouter>
      <div className="App">
      <div className="Header">
        <h1>Phat Dragon</h1>
        <div className="User-info">
          <span></span>
          <h1>User</h1>
        </div>
      </div >
      <div className="Content-container">
        <Switch > 
          <Route exact path = '/' component = {About}/>
          <Route exact path = '/login' component = {Login}/>
          <Route exact path = '/register' component = {Register}/>
          <Route exact path = '/game' component = {Game}/>
          <Route exact path = '/user/:username' component = {User}/>
        </Switch>
      </div>
      </div>
      </HashRouter>
      </Provider>
    );
  }
}

export default App;
