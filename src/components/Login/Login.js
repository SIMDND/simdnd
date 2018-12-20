import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux'
import { updateUser } from '../../dux/reducer'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
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
    let res = await axios.post(`/auth/login`, data);
    console.log(res.data);
    if(res.data.status === 'loggedIn'){
        this.props.updateUser(res.data)
    }
  }

  render() {
    return (
      <div>
        Welcome Back to the Dungeons! Please enter your email here:
        <input
          type="text"
          onChange={e => {
            this.handleEmailChange(e);
          }}
        />
        And now your password here:
        <input
          type="text"
          onChange={e => {
            this.handlePasswordChange(e);
          }}
        />
        Finally, please click Log In!
        <button onClick={() => this.handleSubmit()}>Log In</button>
      </div>
    );
  }
}

export default connect(null, {updateUser} )(Login);
