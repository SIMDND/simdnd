import React, {Component} from 'react';
import axios from 'axios';
import './Chat.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3674');

class Chat extends Component{
    constructor(props){
        super(props);

        this.state = {
            messagesArray:[],
            message:''
        }

        socket.on('what-should-chat-box-say',data=>{
            if (this.props.dm){
                socket.emit('this-is-what-chat-box-should-say',{room:this.props.room,username:this.props.username})
            }
        })

        socket.on('this-is-what-chat-box-should-say',data=>{
            if (!this.props.dm && data.username === this.props.username){
                this.setState({messagesArray:data.messagesArray})
            }
        })

        socket.on('update-messages-array',data=>{
            this.setState({messagesArray:data.messagesArray})
        })
    }

    async componentDidMount(){
        socket.emit('join-room',{room:this.props.room})
        if (this.props.dm){
            if (this.state.messagesArray.length === 0){
                let a = await axios.get(`/api/getmessages/${this.props.campaign_id}`);
                this.setState({messagesArray:a.data})
            }
        }
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

    handleMessageChange(e){
        this.setState({message:e.target.value});
    }

    sendMessage(){
        let a = this.state.messagesArray.slice();
        a.push({sender:this.props.username,message:this.state.message})
        socket.emit("new-message-send",{messagesArray:a,room:this.props.room})
    }

    saveMessages(){
        axios.post('/api/updatemessages',{campaign_id:this.props.campaign_id,messagesArray:this.state.messagesArray});
    }

    displaySaveMessagesButton(){
        if (this.props.dm){
            return (<button className='save-messages-button' onClick={()=>this.saveMessages()}>Save conversations</button>)
        }
    }

    render(){
        return (
            <div className = 'chat-thing'>
                <div className = 'chatBox'>
                    {this.displayAllMessages()}
                </div>
                <div className='creator-of-space'></div>
                <div className='sender-of-message'>
                    <input value={this.state.message} onChange={e=>this.handleMessageChange(e)} className='input-box'></input>
                    <button className='input-button' onClick={()=>this.sendMessage()}>Send Message</button>
                    {this.displaySaveMessagesButton()}
                </div>
            </div>
        )
    }
}

export default Chat;