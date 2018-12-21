import React, {Component} from 'react';
// import Chat from '../Game/Chat.js';
// import axios from 'axios';
import './About.css'

class About extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName: this.props.userName,
            userEmail: this.props.userEmail,
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.userEmail !== prevProps.userEmail || this.props.userName !== prevProps.userName){
            this.setState({
                userName: this.props.userName,
                userEmail: this.props.userEmail,
            })
        }
    }

    getAllPositionsICanMoveTo(height,width,x,y,spaces){
        let arr = [];
        const getSpaces = (h,w,xcoor,ycoor,numspaces)=>{
            if (numspaces === 0){

            }else{
                
            }
        }
    }

    render(){
        return (
            
            <div className='about'>
            <h1 className='title-card'>About</h1>
            <p className = 'description'>Phat Dragon is the ultimate D20 Roll-Playing Game Experience!</p>
            
                {this.state.userEmail || this.state.userName? <div className = 'options'><button onClick={this.props.toggleJoin}>Join</button></div>   : <div className = 'options'><button onClick={this.props.toggleRegister}>Register</button>
                    <button onClick={this.props.toggleLogin}>Login</button>
                    <button onClick={this.props.toggleJoin}>Join</button></div> }
                    
                 
                </div>
        )
    }
}

export default About;