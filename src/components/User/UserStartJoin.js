import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigateUser from './NavigateUser.js'
import './User.css'

class UserStartJoin extends Component{
    constructor(props){
        super(props);

        this.state={

        }
    }

    componentDidMount(){

    }

    componentDidUpdate(){

    }

    render(){
        return(
            <div className="user-container">
                <NavigateUser userName={this.props.userName}></NavigateUser>

            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(UserStartJoin);