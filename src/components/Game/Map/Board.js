import React, {Component} from 'react';
import { Token, Grid } from 'boardgame.io/ui';
import PropTypes from 'prop-types';
import NPC from './Pieces/NPC'
import Player from './Pieces/Player'
import Baggai from './Pieces/Baggai'
import io from 'socket.io-client';
import axios from 'axios';
import {mergeArrays} from '../../../logic/logic_aaron.js';
import './Board.css'

const socket = io.connect('http://localhost:3674');
// import Map from './Map'
// const SELECTED_COLOR = 'green';
// const MOVABLE_COLOR = 'palegreen';
class Board extends Component{
  constructor(props){
    super(props);
    this.state = {

      selectedCharacter:null,
      Tokens:  [{x:5, y:0, id:0, type:'Baggai'}, {x:2, y:0, id:1, type:'NPC'}, {x:3, y:2, id:2, type:'Player'}]
    }
  
    socket.on('show-me-a-moose',data=>{
      console.log(this.props.room)
      this.setState({Tokens:data.Tokens});
      console.log('Tokens,',this.state.Tokens)
    })
    
  }
    async componentDidMount(){
      socket.emit('join-room',{room:this.props.room, name:this.props.name, url:this.props.url})
      let a = await axios.get(`/piece/get-pieces/${this.props.campaign_id}/${this.props.board}`);
      let b = mergeArrays([],a.data);
  setTimeout(()=>{
    this.setState({Tokens:b})
  },1000)
      console.log(b)
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
  this.setState({ Tokens:characters}, () => {
    this.makeAMove();

  });
 
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

makeAMove(){
  console.log('makeAMove has run')
  socket.emit('make-a-move',{room:this.props.room,Tokens:this.state.Tokens})
  
}

    
    render(){
let characters=this.state.Tokens.map(character => {
  if(character.type=== null){
    return(<Token x={character.x} y={character.y} id={character.id} animate >
    <Baggai onClick={(e) => this.characterSelect(character.id,e)} url={character.image_url} />
    </Token>
    )
  } else if(character.type=== 'npc'){
    return(<Token x={character.x} y={character.y} id={character.id} animate onClick={() => this.characterSelect(character.id)} >
      <NPC onClick={(e) => this.characterSelect(character.id,e)} url={character.image_url}/>
      </Token >)
  }else if(character.type==='player'){
    return(<Token x={character.x} y={character.y} id={character.id} animate onClick={() => this.characterSelect(character.id)} >
      <Player onClick={(e) => this.characterSelect(character.id,e)} url={character.image_url}/>
      </Token>)
  }else{
    return(<Token x={character.x} y={character.y} id={character.id} animate onClick={() => this.characterSelect(character.id)} >
    <Player onClick={(e) => this.characterSelect(character.id,e)} url={character.image_url}/>
    </Token>)
  }
 

})


        return (
     <Grid rows={this.props.rows} cols={this.props.cols} style={{ width:'200%', height: '100%' }} onClick={this.squareSelect}>
    {characters}
     </Grid>
        )
    }
}

export default Board;