import React, {Component} from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import '../Login-Register/Login-Register.css';

class CreateCampaign extends Component{
    constructor(props){
        super(props);

        this.state = {
            name:'',
            roomCode:'',
            visible:this.props.visible
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
        this.props.toggleCreateCampaign();
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

    async handleCreateCampaign(){
        let a = await axios.post('/camp/create',{campName:this.state.name,roomCode:this.state.roomCode});
        console.log(a.data);
        this.toggle();
    }

    render(){
        return (
            <div className={this.state.visible? "Modal": "invisible"}>
                <div className="Modal-content">
                    <h1>Create a Campaign</h1>
                    <div className="Input-form">
                        <div className="Input-labels">
                        <h3>Name:</h3>
                        <h3>Room Code:</h3>
                        </div>
                        <div className="Form-inputs">
                        <input
                            type="text"
                            name="name"
                            onChange={e => {
                              this.handleNameChange(e);
                            }}
                        />
                        <input
                            type="room code"
                            style={{textTransform:'uppercase'}}
                            onChange={e => {
                              this.handleRoomCodeChange(e);
                            }}
                        />
                        </div>
                    </div>          
                    <div className="Modal-buttons">
                        <button onClick={this.toggle}>Cancel</button>
                        <button onClick={() => this.handleCreateCampaign()}>Create</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(CreateCampaign);