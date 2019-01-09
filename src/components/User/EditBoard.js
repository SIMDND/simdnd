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


    async handleEditRoom(){
        await axios.put('/board/edit', {new_board_name:this.state.name,board_col:this.state.columns,board_row:this.state.rows,campaign_id:this.props.selectedCampaignId,board_name:this.props.selectedBoard})
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
                        <button name="editBoard" onClick={this.props.toggle}>Cancel</button>
                        <button name="editBoard" onClick={(e) => {this.handleEditRoom(); this.props.toggle(e)}}>Edit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(EditBoard);