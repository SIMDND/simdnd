import React, { Component } from "react";
import axios from "axios";
import "./Login-Register.css";
import { connect } from "react-redux";
import { updateUser } from "../../dux/reducer";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      visible: this.props.visible,
    };
    this.toggle=this.toggle.bind(this)
  }

  componentDidUpdate(prevProps){
    if(this.props.visible !== prevProps.visible){
      this.setState({
        visible: this.props.visible
      })
    }
  }

  toggle(){
      this.setState({
          visible: !this.state.visible
      })
      this.props.toggleLogin()
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
    let res = await axios.post(`/auth/login`, data);
    console.log(res.data);
    if (res.data.status === "loggedIn") {
      this.props.updateUser(res.data);
      this.toggle()
    }
  }

  render() {
    return (
      <div className={this.state.visible? "Modal": "invisible"}>
        <div className="Modal-content">
          <h1>Welcome Back!</h1>
          <div className="Input-form">
            <div className="Input-labels">
              <h3>Email:</h3>
              <h3>Password:</h3>
            </div>
            <div className="Form-inputs">
              <input
                type="text"
                name="email"
                onChange={e => {
                  this.handleEmailChange(e);
                }}
              />
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
              disabled={!this.state.email || !this.state.password}
              onClick={() => this.handleSubmit()}
            >
              Login
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
)(Login);
