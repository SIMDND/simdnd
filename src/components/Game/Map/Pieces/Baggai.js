
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NPC extends Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
  
    
    
    return (
      <g transform="scale(.022222,.022222)" onClick={this.props.onClick}>
       
  
    
<circle cx="22.5" cy="22.5" r="20" fill="#850202"/>


        </g>
    
    );
  }
}

export default NPC;
