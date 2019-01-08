import React, {Component} from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import '../Login-Register/Login-Register.css';

class EditBoard extends Component{
    constructor(props){
        super(props);

        this.state = {
            visible:this.props.visible,
            name:this.props.name,
            columns:this.props.columns,
            rows:this.props.rows
        }
        this.toggle=this.toggle.bind(this);
        this.toggle2=this.toggle2.bind(this);
    }


    componentDidMount(){
    }

    componentDidUpdate(prevProps){
        if(this.props.visible !== prevProps.visible){
          this.setState({
            visible: this.props.visible
          })
        }
        if (this.props.selectedCampaign !== prevProps.selectedCampaign){
            this.setState({name:this.props.selectedCampaign});
        }
        if (this.props.selectedRoomCode !== prevProps.selectedRoomCode){
            this.setState({roomCode:this.props.selectedRoomCode})
        }
      }

      toggle(){
        this.setState({
            visible: !this.state.visible
        })
        this.props.toggleEditBoard();
    }

    toggle2(){
        this.setState({
            visible: !this.state.visible
        })
        this.props.toggleEditBoard();
        this.setState({name:this.props.name,columns:this.props.columns,rows:this.props.rows});
    }

    async handleEditRoom(){
        //let b = 
        this.toggle();
    }

    handleNameChange(e) {
        this.setState({
          name: e.target.value
        });
      }
      handleRowsChange(e) {
        this.setState({
          rows: e.target.value
        });
      }
      handleColumnsChange(e) {
        this.setState({
          columns: e.target.value
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
                        <h3>Rows:</h3>
                        <h3>Columns</h3>
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
                            value={this.state.rows}
                            type="number"
                            onChange={e => {
                              this.handleRowsChange(e);
                            }}
                        />
                        <input
                            value={this.state.columns}
                            type="number"
                            onChange={e => {
                              this.handleColumnsChange(e);
                            }}
                        />
                        </div>
                    </div>     
                    <div className="Modal-buttons">
                        <button onClick={this.toggle2}>Cancel</button>
                        <button onClick={() => this.handleEditRoom()}>Edit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(EditBoard);