import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class Baggai extends Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
  
    
    
    return (
      <g transform="scale(.022222,.022222)" onClick={this.props.onClick}>
       
  <circle cx="22.5" cy="22.5" r="20" fill="#026585"/>  
       <defs>
        <clipPath id="circleView">
        <circle cx="22.5" cy="22.5" r="17" fill="#850202"/>         
        </clipPath>
    </defs>
<image width="100" height="50"
 href={this.props.join.url}
  clip-path="url(#circleView)" />



        </g>
    
    );
  }
}
function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(Baggai);
