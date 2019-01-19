import React, {Component} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {cloneArray,compareArrayLengths,checkForPlayers,getPlayerTokens} from '../../logic/logic_aaron';
import {updateCampaignId} from './../../dux/reducer'

const socket = io.connect('http://localhost:3674');

class WaitRoom extends Component{
    constructor(props){
        super(props)


        this.state = {
            tokens:[],
            thereArePlayers:false
        }
//username,x,y,url,type:player
        socket.on('a-player-just-joined-the-room', async data=>{
            console.log('made it!')
            let a = cloneArray(this.state.tokens)
            a.push(data.token);
            await this.setState({tokens:a});
            this.setState({thereArePlayers:true})
            socket.emit('permission-granted-to-enter-wait-room',{room:this.props.match.params.room,character_name:data.token.character_name,campaign_id:this.props.match.params.campaign_id,board:this.props.match.params.board})
            setTimeout(()=>{
                socket.emit('this-is-the-current-token-array',{room:this.props.match.params.room,tokens:this.state.tokens});
            },500)
        })

        socket.on('this-is-the-current-token-array',data=>{
            if (compareArrayLengths(this.state.tokens,data.tokens)){
                this.setState({tokens:data.tokens})
                this.setState({thereArePlayers:checkForPlayers(this.state.tokens)?true:false})
            }
        })
    }

    async componentDidMount(){
        socket.emit('join-room',{room:this.props.match.params.room});
        let a = await axios.get(`/piece/get-pieces/${this.props.match.params.campaign_id}/${this.props.match.params.board}`);
        await this.setState({tokens:a.data});
        this.setState({thereArePlayers:checkForPlayers(this.state.tokens)?true:false})
        
    }
    async letsGo(){
        let campaignId = this.props.match.params.campaign_id
        this.props.updateCampaignId(campaignId)
        if(this.state.tokens.findIndex(element=>element.character_name===this.props.userName)===-1){
            let d = getPlayerTokens(this.state.tokens);
            for (let i = 0; i < d.length; i++){
                await axios.post('/piece/create',{campaign_id:this.props.match.params.campaign_id,board_name:this.props.match.params.board,character_name:this.state.tokens[i].character_name,piece_type:this.state.tokens[i].piece_type,x_coordinate:0,y_coordinate:0,image_url:this.state.tokens[i].image_url})
            }
        }
    }

    render(){
        return (
            <div>
                <h3>The following tokens are on the board {this.state.thereArePlayers?', players included':', no players though'}</h3>
                {this.state.tokens.map((element,index,arr)=>{
                    return (
                        <div style={{color:'white'}}>Name: {element.character_name} Type: {element.piece_type} </div>
                    )
                })}
                <Link to={`/game/${this.props.match.params.room}/${this.props.match.params.campaign_id}/${this.props.match.params.board}`}><button onClick={() => this.letsGo()}>
                    Start!
                    </button></Link>
               
            </div>
        )
    }
}

export default connect(null, {updateCampaignId})(WaitRoom);