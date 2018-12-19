import React, { Component } from 'react';
import PropTypes from 'prop-types';
import imgBaggai from './Image/Baggai.svg'
import imgNPC from './Image/NPC.svg'
import imgPlayer from './Image/Player.svg'

class Piece extends Component{
    constructor(props){
        super(props);
        this.state = {
            svg: ''
        }
    }
static propTypes = {
    img: PropTypes.string,
    mvtSpeed: PropTypes.string,
    playerName: PropTypes.string,
    charType: PropTypes.string,
}
componentDidMount(){
    this.selectPiece();
}
static defaultProps = {
    img: 'https://thumbs.dreamstime.com/z/goblin-warrior-25301249.jpg',
    mvtSpeed: 5,
    playerName: 'Zugg',
    charType: 'Baggai'
}
selectPiece(){
    switch(this.props.charType){
        case  'Baggai':
        return this.setState({svg:imgBaggai})
        case 'Player':
        return this.setState({svg:imgPlayer})
        case 'NPC':
        return this.setState({svg:imgNPC})
    }
}

render(){
    
    return (
        <div>

        </div>
    )
}
}
export default Piece