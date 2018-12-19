import React, {Component} from 'react';
import {Grid} from 'boardgame.io/ui';
import PropTypes from 'prop-types';
class Board extends Component{
    static propTypes = {
        rows: PropTypes.number,
        cols: PropTypes.number,
        onClick: PropTypes.func,
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
        highlightedSquares: PropTypes.object,
        style: PropTypes.object,
        children: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.element),
          PropTypes.element,
        ]),
      };
      static defaultProps = {
        rows: 8,
        cols: 8,
        onClick: () => {},
        primaryColor: '#d18b47',
        secondaryColor: '#ffce9e',
        highlightedSquares: {},
        style: {},
      };
    componentDidMount(){

    }
  
    _algebraicToCartesian(square) {
        let regexp = /([A-Za-z])(\d+)/g;
        let match = regexp.exec(square);
        if (match == null) {
          throw 'Invalid square provided: ' + square;
        }
        let colSymbol = match[1].toLowerCase();
        let col = colSymbol.charCodeAt(0) - 'a'.charCodeAt(0);
        let row = parseInt(match[2]);
        return { x: col, y: this.props.rows - row };
      }
    
      _cartesianToAlgebraic(x, y) {
        let colSymbol = String.fromCharCode(x + 'a'.charCodeAt(0));
        return colSymbol + (this.props.rows - y);
      }
    
    render(){
        const tokens = React.Children.map(this.props.children, child => {
            const square = child.props.square;
            const { x, y } = this._algebraicToCartesian(square);
            return React.cloneElement(child, { x, y });
          });
        let colorMap = {};
    for (let x = 0; x < this.props.cols; x++) {
      for (let y = 0; y < this.props.rows; y++) {
        const key = `${x},${y}`;
        let color = this.props.secondaryColor;
        if ((x + y) % 2 == 0) {
          color = this.props.primaryColor;
        }
        colorMap[key] = color;
      }
    }
    for (const square in this.props.highlightedSquares) {
        const { x, y } = this._algebraicToCartesian(square);
        const key = `${x},${y}`;
        colorMap[key] = this.props.highlightedSquares[square];
      }

        return (
        <Grid rows={this.props.rows}
        cols={this.props.cols}
        style={this.props.style}
        onClick={this.onClick}
        colorMap={colorMap}
        >
        {tokens}
        
        </Grid>
        )
    }
}

export default Board;