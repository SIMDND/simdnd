import React, { Component } from "react";
import "./Login-Register.css";
import { connect } from "react-redux";
import { updateJoin } from "../../dux/reducer";
import { Link } from 'react-router-dom'

class Join extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName: "",
      roomCode: "",
      url:'',
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
      this.props.toggleJoin()
      
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

   handleSubmit() {
    let data = { playerName:this.state.playerName,
      roomCode:this.state.roomCode,
      url:this.state.url,
    };
      this.props.updateJoin(data);
      
      this.toggle()
    }
  

  render() {
    return (
      <div className={this.state.visible? "Login-modal": "invisible"}>
        <div className="Modal-content">
          <h1>Join Game</h1>
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
                  <input
                type="text"
                name="url"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="Modal-buttons">
          <button onClick={this.toggle}>Cancel</button>
      
          <button  disabled={!this.state.playerName || !this.state.roomCode}> 
          <Link to='game'
              disabled={!this.state.playerName || !this.state.roomCode}
              onClick={() =>this.handleSubmit()}
            >
           
              Join
              </Link>
            </button>
          
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { updateJoin }
)(Join);
