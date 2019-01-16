import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './User.css';

class NavigateUser extends Component{
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
            <div className='user-nav-bar'>
                <NavLink to={`/user/edit/${this.props.userName}`}  className="nav-link" activeClassName="nav-select">
                    <h2>Edit</h2>
                </NavLink>
                <NavLink to={`/user/start-join/${this.props.userName}`} className= "nav-link" activeClassName="nav-select">
                    <h2>Start/Join</h2>
                </NavLink>
                <NavLink to={`/user/pieces/${this.props.userName}`} className="nav-link" activeClassName="nav-select">
                    <h2>Pieces</h2>
                </NavLink>
            </div>
        )
    }
}

export default NavigateUser;