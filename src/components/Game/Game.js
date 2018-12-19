import React, {Component} from 'react';
import Board from './Map/Board'
import Token from 'boardgame.io/ui'
import Piece from './Map/Piece'

class Game extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount(){

    }
    _getPieces() {
        let result = [];
        for (let y = 1; y <= 8; y++) {
          for (let x = 0; x < 8; x++) {
            let square = x + y;
           
              result.push(
                <Token
                  square={square}
                  animate={true}
                  key={this._getInitialCell(square)}
                  onClick={this.click.bind(this)}
                >
                  {this._getPieceByType('Baggai')}
                </Token>
              );
            }
          }
        
        return result;
      }
      _getInitialCell(square) {
        let history = this.chess.history({ verbose: true });
        let lastSeen = square;
        for (let i = history.length - 1; i >= 0; i--) {
          let move = history[i];
          if (lastSeen == move.to) {
            lastSeen = move.from;
          }
        }
        return lastSeen;
      }
      _getPieceByType(type) {
      
            return <Piece charType={type} />
        }
      

    render(){
        return (
            <div>
                <Board row='12' col='12' style={{ width: '70%', height: '90vh' }}>
                {this._getPieces()}
                </Board>
            </div>
        )
    }
}

export default Game;