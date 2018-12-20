import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "../../dux/reducer";
import "./Login-Register.css";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      userName: "",
      visible: this.props.visible,
    };
    this.toggle=this.toggle.bind(this)
  }

  componentDidMount() {}

  componentDidUpdate(prevProps){
    if(this.props.visible !== prevProps.visible){
      this.setState({
        visible: this.props.visible
      })
    }
  }

  toggle() {
    this.setState({
      visible: !this.state.visible
    });
    this.props.toggleRegister()
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }
  async handleSubmit() {
    let data = { ...this.state };
    let res = await axios.post(`/auth/register`, data);
    console.log(res.data);
    if (res.data.status === "loggedIn") {
      this.props.updateUser(res.data);
      this.toggle()
    }
  }
  handleUsernameChange(e) {
    this.setState({
      userName: e.target.value
    });
  }

  render() {
    return (
      <div className={this.state.visible ? "Login-modal" : "invisible"}>
        <div className="Modal-content">
          <h1>Register</h1>
          <div className="Input-form">
            <div className="Input-labels">
              <h3>Email:</h3>
              <h3>Username:</h3>
              <h3>Password:</h3>
            </div>
            <div className="Form-inputs">
              <input
                type="text"
                onChange={e => {
                  this.handleEmailChange(e);
                }}
              />
              <input type="text" onChange={e => this.handleUsernameChange(e)} />
              <input
                type="password"
                onChange={e => {
                  this.handlePasswordChange(e);
                }}
              />
            </div>
          </div>

          <div className="Modal-buttons">
            <button onClick={this.toggle}>Cancel</button>
            <button
              disabled={
                !this.state.email ||
                !this.state.password ||
                !this.state.userName
              }
              onClick={() => this.handleSubmit()}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { updateUser }
)(Register);
