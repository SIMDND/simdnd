import React, {Component} from 'react';
import Board from './Map/Board'
import Chat from './Chat.js'
import {connect} from 'react-redux'

class Dnd extends Component{
    constructor(props){
        super(props);

        this.state = {


        }
    }
    
    
    render(){
        return (
            <div>
                <Board room={this.props.join.roomCode}>
                
                </Board>
            </div>
        )
    }
}
function mapStateToProps(state){
    return state
  }

export default connect(mapStateToProps)(Dnd);