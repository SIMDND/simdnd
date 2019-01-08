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
        this.props.toggleConfirmDeleteBoard();
    }

    async handleDelete(){
        //let a = 
        this.toggle();
    }

    render(){
        return (
            <div className={this.state.visible? "Modal": "invisible"}>
                <div className="Modal-content">
                    <h1>Are you sure you want to delete {this.props.selectedBoard}?</h1>
                    <div className="Modal-buttons">
                        <button onClick={this.toggle}>Cancel</button>
                        <button onClick={() => this.handleDelete()}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(ConfirmDeleteBoard);