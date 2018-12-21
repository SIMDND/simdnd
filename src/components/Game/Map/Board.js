import React, {Component} from 'react';
import { Token } from 'boardgame.io/ui';
import PropTypes from 'prop-types';
import NPC from './Pieces/NPC'
import Player from './Pieces/Player'
import Baggai from './Pieces/Baggai'
import Map from './Map'
const SELECTED_COLOR = 'green';
const MOVABLE_COLOR = 'palegreen';
class Board extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected:{x:0, y:0}
    }
  }

    static propTypes = {
        rows: PropTypes.number,
        cols: PropTypes.number,
        onClick: PropTypes.func,
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
        highlightedSquares: PropTypes.object,
      };
      static defaultProps = {
        rows: 0,
        cols: 0
      };
    componentDidMount(){

    }
// squareSelect(){
//   let prevX = this.state.x;
//   let prevY = this.state.y;
//   prevX++;
//   prevY++;
// this.setState({

//   x:prevX,
//   y:prevY,
// })
// }
squareSelect = (x, y) => {

    this.setState({ selected: {x, y }});
  console.log(this.state.selected);
}
getHighlightedSquares() {
  let result = {};
  if(this.state.selected) {
    let newnum = `${this.state.selected.x},${this.state.selected.y}`
    result[this.state.selected] = SELECTED_COLOR;
  }
  return result;
}
    
    render(){


        return (
     <Map rows={15} cols={15} style={{ width: '70%', height: '90vh' }} onClick={this.squareSelect}
     highlightedSquares={this.getHighlightedSquares()}>
     <Token x={this.state.x} y={this.state.y} animate={true} onClick={this.squareSelect.bind(this)}>
     
       <NPC/>
     </Token>
     <Token x={2} y={2} animate={true} onClick={this.squareSelect.bind(this)}>
     <Player />
       
     </Token>
     <Token x={1} y={1} animate={true} onClick={this.squareSelect.bind(this)}>
     <Baggai />
       
     </Token>
     </Map>
        )
    }
}

export default Board;