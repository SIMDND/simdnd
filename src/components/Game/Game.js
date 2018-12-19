import React, {Component} from 'react';
import Board from './Map/Board'

class Game extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount(){

    }

    render(){
        return (
            <div>
                <Board row='12' col='12' style={{ width: '90%' }}/>
            </div>
        )
    }
}

export default Game;