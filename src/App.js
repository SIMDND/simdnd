import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect,Link } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import axios from 'axios'
import Logo from './logo.svg'
import store from './dux/store.js';
import About from './components/About/About.js';
import Login from './components/Login-Register/Login';
import Register from './components/Login-Register/Register';
import Join from './components/Login-Register/Join';
import ConfirmDeletion from './components/User/ConfirmDeletion.js';
import Game from './components/Game/Dnd';
import UserEdit from './components/User/UserEdit.js';
import UserStartJoin from './components/User/UserStartJoin.js';
import UserPieces from './components/User/UserPieces.js';
import './App.css';
import {toggle} from './logic/logic_matt';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      userName: "",
      userEmail: "",
      loginModal: false,
      registerModal: false,
      joinModal: false,
    }
    this.toggleLogin=this.toggleLogin.bind(this)
    this.toggleRegister=this.toggleRegister.bind(this)
    this.toggleJoin= this.toggleJoin.bind(this)
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

  toggleLogin(){
    console.log(toggle())
    this.setState({
      loginModal: !this.state.loginModal
    })
  }

  toggleRegister(){
    console.log()
    this.setState({
      registerModal: !this.state.registerModal
    })
  }

  toggleJoin(){
    this.setState({
      joinModal: !this.state.joinModal
    })
  }

  
  render() {
    return (
      <Provider store={store}>
      <HashRouter>
      <div className="App">
        <Login visible={this.state.loginModal} toggleLogin={this.toggleLogin}/>
        <Register visible={this.state.registerModal} toggleRegister={this.toggleRegister}/>
        <Join visible={this.state.joinModal} toggleJoin={this.toggleJoin}/>
      <div className="Header">
      <Link  className ="Logo" to="/">
        <img src={Logo} alt="logo"/>
        <h1>Phat Dragon</h1>
      </Link>
        <div className="User-info">
        {!this.state.userName && !this.state.userEmail? <h1>Login</h1>:<Link className="User-name" to={`/user/edit/${this.state.userName}`}>
            <h1>{this.state.userName}</h1>
          </Link>}
          {!this.state.userName && !this.state.userEmail? null:
            <span></span>}
        </div>
      </div >
      <div className="Content-container">
        <Switch > 
          <Route exact path = '/' render = {(props) =><About {...props} userName={this.state.userName} userEmail={this.state.userEmail}toggleLogin={this.toggleLogin} toggleRegister={this.toggleRegister} toggleJoin={this.toggleJoin} bungle="bungle"/> }></Route>
          <Route exact path = '/game' component = {Game}/>
          <Route exact path = '/user/edit/:username' render = {(props) =><UserEdit {...props} userName={this.state.userName} userEmail={this.state.userEmail} toggleLogin={this.toggleLogin} toggleRegister={this.toggleRegister} toggleJoin={this.toggleJoin}/>}></Route>
          <Route exact path = '/user/start-join/:username' render = {(props) =><UserStartJoin {...props} userName={this.state.userName} userEmail={this.state.userEmail} toggleLogin={this.toggleLogin} toggleRegister={this.toggleRegister} toggleJoin={this.toggleJoin}/>}></Route>
          <Route exact path = '/user/pieces/:username' render = {(props) =><UserPieces {...props} userName={this.state.userName} userEmail={this.state.userEmail} toggleLogin={this.toggleLogin} toggleRegister={this.toggleRegister} toggleJoin={this.toggleJoin}/>}></Route>
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
