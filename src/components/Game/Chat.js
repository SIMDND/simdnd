import React, {Component} from 'react';
import './Chat.css';

class Chat extends Component{
    constructor(props){
        super(props);

        this.state = {
            messagesArray:[]
        }
    }

    componentDidMount(){

    }

    displayAllMessages(){
        return this.state.messagesArray.map((element,index,arr)=>{
            return (
            <div className='text-carrier'>
            <p className='message'>Sender: {element.sender}</p>
                <p className='message'>Message: {element.message}</p>
                </div>)
        
        })
    }

    render(){
        return (
            <div className = 'chat-thing'>
                <div className = 'chatBox'>
                    {this.displayAllMessages()}
                </div>
                <div className='creator-of-space'></div>
                <div className='sender-of-message'>
                    <input className='input-box'></input>
                    <button className='input-button'>Send Message</button>
                </div>
            </div>
        )
    }
}

export default Chat;