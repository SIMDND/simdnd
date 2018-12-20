import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect,Link } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import axios from 'axios'
import Logo from './logo.svg'
import store from './dux/store.js';
import About from './components/About/About.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Game from './components/Game/Game.js';
import User from './components/User/User.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      userName: "",
      userEmail: "",
    }
  }

  async componentDidMount(){
    let res = await axios.get('/auth/get-user')
    console.log(res.data)
    this.setState({
      userEmail: res.data.userEmail,
      userName: res.data.userName
    })
  }

  componentDidUpdate(prevProps){
    if ( this.props.user !== prevProps.user){
      this.setState({
        userEmail: this.props.user.userEmail,
        userName: this.props.user.userName
      })
    }
  }

  render() {
    return (
      <Provider store={store}>
      <HashRouter>
      <div className="App">
      <div className="Header">
      <Link  className ="Logo" to="/">
        <h1>Phat Dragon</h1>
        <img src={Logo} alt="logo"/>
      </Link>
        <div className="User-info">
        {!this.state.userName && !this.state.userEmail? <h1>Login</h1>:<Link className="User-name" to="/user/:username">
            <h1>{this.state.userName}</h1>
          </Link>}
          {!this.state.userName && !this.state.userEmail? null:
            <span></span>}
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

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(App);
