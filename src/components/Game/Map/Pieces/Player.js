import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class Player extends Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
  
    
    
    return (
      <g transform="scale(.022222,.022222)" onClick={this.props.onClick}>
       
  <circle cx="22.5" cy="22.5" r="20" fill="#026585"/>  
       <defs>
        <clipPath id="circleView">
        <circle cx="22.5" cy="22.5" r="17" fill="#026585"/>         
        </clipPath>
    </defs>
<image width="35" height="35"
 href={this.props.join.url}
  clip-path="url(#circleView)"
  x='50%' y='50%' />



        </g>
    
    );
  }
}
function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(Player);
