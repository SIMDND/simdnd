import React, { Component } from "react";
import Board from "./Map/Board";
import Chat from "./Chat.js";
import { connect } from "react-redux";
import axios from "axios";

class Dnd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
      currentBoard: [{}],
    };
  }
  async componentDidMount() {
    let res = await axios.get(`/board/get-boards/${this.props.campaignId}`);
    this.setState({
      boards: res.data,
      currentBoard: res.data.filter(board => board.starting === true)
    });
  }

  render() {
    //  var currentBoard = this.state.boards.filter(board => board.starting === true)
    //  console.log("currentBoard",currentBoard)
     var gameBoard = this.state.currentBoard.map((el,i) => {
        return (
              <Board
                key={i}
                room={this.props.join.roomCode}
                rows={this.state.currentBoard[0].board_row}
                cols={this.state.currentBoard[0].board_col}
              />
          );
     })
    return (
      <div>
        {gameBoard}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Dnd);
