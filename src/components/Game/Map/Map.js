import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Grid} from 'boardgame.io/ui';

class Map extends Component {

    onClick=({x, y}) => {
        this.props.onClick(x, y)
    }
render(){
    let colorMap={}
    for (const {x,y} in this.props.highlightedSquares){
      const key = `${x},${y}`
      colorMap[key]=this.props.highlightedSquares[key];
    }

    const tokens = React.Children.map(this.props.children, child => {
        const {x, y} = child.props;
        return React.cloneElement(child, {x, y})
    })
    return(
        
        <Grid rows={this.props.rows}
        cols={this.props.cols}
        style={this.props.style}
        onClick={this.onClick}
        >
        {tokens}
        </Grid>
    )
}

}
export default Map;