import React, { Component } from "react";
import axios from "axios";
import "./Login-Register.css";
import { connect } from "react-redux";
import { updateUser } from "../../dux/reducer";

class Join extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName: "",
      roomCode: "",
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
      <div className={this.state.visible? "Login-modal": "invisible"}>
        <div className="Modal-content">
          <h1></h1>
          <div className="Input-form">
            <div className="Input-labels">
              <h3>Player Name:</h3>
              <h3>Room Code:</h3>
            </div>
            <div className="Form-inputs">
              <input
                type="text"
                name="playerName"
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="roomCode"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="Modal-buttons">
          <button onClick={this.toggle}>Cancel</button>
            <button
              onClick={this.toggle}
            >
              Cancel
            </button>
            <button
              disabled={!this.state.playerName || !this.state.roomCode}
              onClick={this.toggle}
            >
              Join
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
)(Join);
