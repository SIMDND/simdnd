import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      userName: ""
    };
  }

  componentDidMount() {}
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
  }
  handleUsernameChange(e) {
    this.setState({
      userName: e.target.value
    });
  }

  render() {
    return (
      <div>
        First time? Please enter your email here:
        <input
          type="text"
          onChange={e => {
            this.handleEmailChange(e);
          }}
        />
        Please enter a unique username:
        <input type="text" onChange={e => this.handleUsernameChange(e)} />
        And now your password here:
        <input
          type="text"
          onChange={e => {
            this.handlePasswordChange(e);
          }}
        />
        Finally, please click register!
        <button onClick={() => this.handleSubmit()}>Register</button>
      </div>
    );
  }
}

export default Register;
