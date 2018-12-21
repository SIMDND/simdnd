import React, {Component} from 'react';
// import Chat from '../Game/Chat.js';
// import axios from 'axios';
import Rectangle from './Rectangle.svg';
import './About.css'

class About extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }

    

    componentDidMount(){
        
    }

    render(){
        return (
            
            <div className='about'>
            <h1 className='title-card'>About</h1>
            <img className='technologies-rectangle' src={Rectangle}></img>
            <p className = 'description'>Phat Dragon uses the above technologies to give users the ultimate D20 Roll-Playing Game Experience</p>
            <div className = 'options'>
                    <button onClick={this.props.toggleRegister}>Register</button>
                    <button onClick={this.props.toggleLogin}>Login</button>
                    <button>Join</button>
                </div>    
                </div>
        )
    }
}

export default About;