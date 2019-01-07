import React, {Component} from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import '../Login-Register/Login-Register.css';

class EditCampaign extends Component{
    constructor(props){
        super(props);

        this.state = {
            visible:this.props.visible,
            name:this.props.name,
            roomCode:this.props.roomCode
        }
        this.toggle=this.toggle.bind(this);
    }


    componentDidMount(){
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
        this.props.toggleEditCampaign();
    }

    async handleEditRoom(){
        let a = await axios.put('/camp/edit-room');
        let b = await axios.put('/camp/edit-name');
        console.log(b.data);
        this.toggle();
    }

    handleNameChange(e) {
        this.setState({
          name: e.target.value
        });
      }
      handleRoomCodeChange(e) {
        this.setState({
          roomCode: e.target.value.toUpperCase()
        });
      }

    render(){
        return (
            <div className={this.state.visible? "Modal": "invisible"}>
                <div className="Modal-content">
                    <h1>Edit {this.props.selectedCampaign}?</h1>
                    <div className="Input-form">
                        <div className="Input-labels">
                        <h3>Name:</h3>
                        <h3>Room Code:</h3>
                        </div>
                        <div className="Form-inputs">
                        <input
                            value={this.state.name}
                            type="text"
                            name="name"
                            onChange={e => {
                              this.handleNameChange(e);
                            }}
                        />
                        <input
                            value={this.state.roomCode}
                            style={{textTransform:'uppercase'}}
                            type="room code"
                            onChange={e => {
                              this.handleRoomCodeChange(e);
                            }}
                        />
                        </div>
                    </div>     
                    <div className="Modal-buttons">
                        <button onClick={this.toggle}>Cancel</button>
                        <button onClick={() => this.handleEditRoom()}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(EditCampaign);