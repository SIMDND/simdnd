import React, {Component} from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import '../Login-Register/Login-Register.css';

class CreatePiece extends Component{
    constructor(props){
        super(props);

        this.state = {
            character_name:'',
            piece_type:'',
            x_coordinate:'',
            y_coordinate:'',
            image_url:''
        }
    }


    componentDidMount(){

    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        return (
            <div className={this.props.visible? "Modal": "invisible"}>
                <div className="Modal-content">
                    <h1>Create a Piece</h1>
                    <div className="Input-form">
                        <div className="Input-labels">
                        <h3>Character Name:</h3>
                        <h3>Piece Type:</h3>
                        <h3>X-Coordinate:</h3>
                        <h3>Y-Coordinate:</h3>
                        <h3>Image URL:</h3>
                        </div>
                        <div className="Form-inputs">
                        <input
                            type="text"
                            name="character_name"
                            onChange={e => {
                              this.handleChange(e);
                            }}
                        />
                        <select
                            name='piece_type'
                            onChange={e=>{
                                this.handleChange(e);
                            }}
                        >
                            <option hidden>Pick Type</option>
                            <option key={0} value='npc'>NPC</option>
                            <option key={1} value='baggai'>Baggai</option>
                        </select>
                        <input
                            type="number"
                            name="x_coordinate"
                            onChange={e => {
                              this.handleChange(e);
                            }}
                        />
                        <input
                            type="number"
                            name="y_coordinate"
                            onChange={e => {
                              this.handleChange(e);
                            }}
                        />
                        <input
                            type="text"
                            name="image_url"
                            onChange={e => {
                              this.handleChange(e);
                            }}
                        />
                        </div>
                    </div>          
                    <div className="Modal-buttons">
                        <button name="createPiece" onClick={()=>this.props.toggleCreatePiece()}>Cancel</button>
                        <button name="createPiece" onClick={() => {this.props.handleCreatePiece(this.props.selectedCampaignId,this.props.selectedBoard,this.state.character_name,this.state.piece_type,this.state.x_coordinate,this.state.y_coordinate,this.state.image_url); this.props.toggleCreatePiece()}}>Create</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(CreatePiece);