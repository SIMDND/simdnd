import React, {Component} from 'react';
import { Token, Grid } from 'boardgame.io/ui';
import PropTypes from 'prop-types';
import NPC from './Pieces/NPC'
import Player from './Pieces/Player'
import Baggai from './Pieces/Baggai'
// import Map from './Map'
// const SELECTED_COLOR = 'green';
// const MOVABLE_COLOR = 'palegreen';
class Board extends Component{
  constructor(props){
    super(props);
    this.state = {

      selectedCharacter:null,
      Tokens: [{x:5, y:0, id:0, type:'Baggai'}, {x:2, y:0, id:1, type:'NPC'}, {x:3, y:2, id:2, type:'Player'}]
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

squareSelect = ({x, y}) => {
if(this.state.selectedCharacter !== null){
  let characters = this.state.Tokens.map(character => {
    let newCharacter = {...character};
    if (newCharacter.id === this.state.selectedCharacter){
      newCharacter.x = x;
      newCharacter.y = y;
    }
    return newCharacter;
  })
  this.setState({ Tokens:characters});

}else{
  console.log('We have not selected a character yet!')
}
   
}
characterSelect(id, e){
  e.stopPropagation();

  this.setState({selectedCharacter: id })
}
// getHighlightedSquares() {
//   let result = {};
//   if(this.state.selected) {
//     let newnum = `${this.state.selected.x},${this.state.selected.y}`
//     result[newnum] = SELECTED_COLOR;
//   }
//   return result;
// }
    
    render(){

let characters=this.state.Tokens.map(character => {
  if(character.type=== 'Baggai'){
    return(<Token x={character.x} y={character.y} id={character.id} animate  >
    <Baggai onClick={(e) => this.characterSelect(character.id,e)} />
    </Token>
    )
  } else if(character.type=== 'NPC'){
    return(<Token x={character.x} y={character.y} id={character.id} animate onClick={() => this.characterSelect(character.id)} >
      <NPC onClick={(e) => this.characterSelect(character.id,e)}/>
      </Token >)
  }else if(character.type==='Player'){
    return(<Token x={character.x} y={character.y} id={character.id} animate onClick={() => this.characterSelect(character.id)} >
      <Player onClick={(e) => this.characterSelect(character.id,e)}/>
      </Token>)
  }
 

})


        return (
     <Grid rows={12} cols={12} style={{ width: '70%', height: '90vh' }} onClick={this.squareSelect}>
    {characters}
     </Grid>
        )
    }
}

export default Board;