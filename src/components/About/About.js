import React, { Component } from "react";
// import Chat from '../Game/Chat.js';
// import axios from 'axios';
import "./About.css";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userName,
      userEmail: this.props.userEmail
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.userEmail !== prevProps.userEmail ||
      this.props.userName !== prevProps.userName
    ) {
      this.setState({
        userName: this.props.userName,
        userEmail: this.props.userEmail
      });
    }
  }

  async componentDidMount() {}

  render() {
    console.log(this.state.userEmail);
    return (
      <div className="about">
        <h1 className="title-card">Welcome!</h1>
        <h1>
          Phat Dragon is the ultimate D20 Roll-Playing Game Experience!
        </h1>
        <h2>
            Phat Dragon is designed to help tabletop players set up game boards to play with eachother remotely. One simply has to create an account and then they can enjoy all of Phat Dragon's features. Once players are logged in they can either create or join rooms and see their game pieces move live!
        </h2>
        <h2>What are you waiting for? Join now and play!</h2>
        {this.state.userEmail || this.state.userName ? (
          null
        ) : (
          <div className="options">
            <button onClick={this.props.toggleLogin}>Login</button>
            <button onClick={this.props.toggleRegister}>Register</button>
          </div>
        )}
      </div>
    );
  }
}

export default About;
