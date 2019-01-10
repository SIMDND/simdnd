import React, {Component} from 'react';
import Board from './Map/Board'
import Chat from './Chat.js'
import {connect} from 'react-redux'
import axios from 'axios';


class Dnd extends Component{
    constructor(props){
        super(props);

        this.state = {
            boards: [],


        }
    }
   async componentDidMount(){
        let res = await axios.get(`/board/get-boards/:${this.props.campaignId}`)
        this.setState({boards:res.data})
    }
    
    
    render(){
        let current = this.state.boards.filter(board => board.starting===true)
        return (
            <div>
                <Board room={this.props.join.roomCode} rows={current.board_row} cols={current.board_col}>
                
                </Board>
            </div>
        )
    }
}
function mapStateToProps(state){
    return state
  }

export default connect(mapStateToProps)(Dnd);