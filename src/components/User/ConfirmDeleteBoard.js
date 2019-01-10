import React, {Component} from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import '../Login-Register/Login-Register.css';

class ConfirmDeleteBoard extends Component{
    constructor(props){
        super(props);

        this.state = {
            visible:this.props.visible
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
      }


    async handleDelete(){
        await axios.delete(`/board/delete/${this.props.selectedCampaignId}/${this.props.selectedBoard}`)
    }

    render(){
        return (
            <div className={this.state.visible? "Modal": "invisible"}>
                <div className="Modal-content">
                    <h1>Are you sure you want to delete {this.props.selectedBoard}?</h1>
                    <div className="Modal-buttons">
                        <button name="deleteBoard" onClick={this.props.toggle}>Cancel</button>
                        <button name="deleteBoard" onClick={(e) => {this.handleDelete(); this.props.toggle(e)}}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(ConfirmDeleteBoard);