import React, {Component} from 'react';
import Board from './Map/Board'
import Chat from './Chat.js'

class Dnd extends Component{
    constructor(props){
        super(props);

        this.state = {


        }
    }
    
    
    render(){
        return (
            <div>
                <Board room='heyjude'>
                
                </Board>
            </div>
        )
    }
}

export default Dnd;