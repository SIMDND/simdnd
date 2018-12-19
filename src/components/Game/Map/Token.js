import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Token extends Component{
static propTypes = {
    img: PropTypes.string,
    mvtSpeed: PropTypes.string,
    playerName: PropTypes.string,
}
static defaultProps = {
    img: 'https://thumbs.dreamstime.com/z/goblin-warrior-25301249.jpg',
    mvtSpeed: 5,
    playerName: 'Zugg'
}

render(){
    return (
        <div>
            
        </div>
    )
}
}