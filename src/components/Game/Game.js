import React, {Component} from 'react';
import Board from './Map/Board'

class Game extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return (
            <div>
                <Board>
                
                </Board>
            </div>
        )
    }
}

export default Game;