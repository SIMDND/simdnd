import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
                <Link to={`/user/edit/${this.props.userName}`} id='aa' className='nav-link'>
                    <h2>Edit</h2>
                </Link>
                <Link to={`/user/start-join/${this.props.userName}`} className='nav-link'>
                    <h2>Start-Join</h2>
                </Link>
                <Link to={`/user/pieces/${this.props.userName}`} id='bb' className='nav-link'>
                    <h2>Pieces</h2>
                </Link>
            </div>
        )
    }
}

export default NavigateUser;