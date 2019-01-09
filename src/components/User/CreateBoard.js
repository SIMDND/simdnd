import React, {Component} from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import '../Login-Register/Login-Register.css';

class CreateBoard extends Component{
    constructor(props){
        super(props);

        this.state = {
            name:'',
            columns:5,
            rows:5
        }
    }


    componentDidMount(){

    }

    handleNameChange(e) {
        this.setState({
          name: e.target.value
        });
      }
      handleColumnsChange(e) {
        this.setState({
            columns:e.target.value
        });
      }
      handleRowsChange(e){
          this.setState({
              rows:e.target.value
          })
      }

    async handleCreateBoard(){
        //let a 
        this.toggle();
    }

    render(){
        return (
            <div className={this.state.visible? "Modal": "invisible"}>
                <div className="Modal-content">
                    <h1>Create a Board</h1>
                    <div className="Input-form">
                        <div className="Input-labels">
                        <h3>Name:</h3>
                        <h3>Columns:</h3>
                        <h3>Rows:</h3>
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
                            type="number"
                            onChange={e => {
                              this.handleColumnsChange(e);
                            }}
                        />
                        <input
                            type="number"
                            name="name"
                            onChange={e => {
                              this.handleRowsChange(e);
                            }}
                        />
                        </div>
                    </div>          
                    <div className="Modal-buttons">
                        <button onClick={this.props.toggleCreateBoard()}>Cancel</button>
                        <button onClick={() => this.handleCreateBoard()}>Create</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(CreateBoard);