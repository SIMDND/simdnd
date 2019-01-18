import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigateUser from './NavigateUser.js'
import './User.css'
import axios from 'axios'
import { updateJoin } from "../../dux/reducer";
import {Link, Redirect} from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3674');

class UserStartJoin extends Component{
    constructor(props){
        super(props);

        this.state={
            campaigns:[],
            boards:[],
            roomCode:'',
            myRoom:'',
            tokenName:'',
            tokenImg:'',
            selectedCampaign:'',
            selectedCampaignId:-1,
            selectedBoard:'',
            index:-1,
            receivedCampaignId:0,
            receivedBoard:'',
            redirect:false
        }

        socket.on('permission-granted-to-enter-wait-room',async data=>{
            console.log('we made it to permission grant!', data.character_name)
            if (this.props.userName===data.character_name){
                console.log('are we in the if statement')
                 this.setState({receivedCampaignId:data.campaign_id,receivedBoard:data.board});
                 this.setState({redirect:true})
             
            }
        })
        this.handleChange = this.handleChange.bind(this)
    }

    async componentDidMount(){
        let a = await axios.get("/camp/get-camps");
        this.setState({ campaigns: a.data });
    }

    redirect(){
        if (this.state.redirect){
            return <Redirect to={`/game/waitroom/${this.state.roomCode}/${this.state.receivedCampaignId}/${this.state.receivedBoard}`}/>
        }
    
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.campaigns != prevState.campaigns) {
          setTimeout(async () => {
            let a = await axios.get("/camp/get-camps");
            this.setState({ campaigns: a.data });
          }, 1000);
        }
        if (this.state.selectedCampaign !== prevState.selectedCampaign) {
          setTimeout(async () => {
            let b = await axios.get(
              `/board/get-boards/${this.state.selectedCampaignId}`
            );
            let c = b.data.findIndex(element => element.starting === true);
            this.setState({
              boards: b.data,
              defaultBoard: c !== -1 ? b.data[c].board_name : ""
            });
          }, 200);
        }
      }
      joinRoom(){
          console.log('join room ran',this.state.roomCode)
          socket.emit('join-room',{room:this.state.roomCode});
        let data = { name:this.state.tokenName,
            roomCode:this.state.roomCode,
            url:this.state.tokenImg,
          };
          this.props.updateJoin(data);
          let token = {
              character_name:this.props.userName,
              x_coordinate:0,
              y_coordinate:0,
              piece_type:'player',
              image_url:this.state.tokenImg
          }
          setTimeout(()=>{
            socket.emit('me-me-wants-to-join-room',{room:this.state.roomCode,token});
          },500)
          this.redirect();
      }
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        setTimeout(() => {
          this.setState({
            selectedRoomCode: !this.state.selectedCampaign
              ? ""
              : this.state.campaigns[
                  this.state.campaigns.findIndex(
                    (element, index, arr) =>
                      element.campaign_name === this.state.selectedCampaign
                  )
                ].room_code
          });
          this.setState({
            selectedCampaignId: !this.state.selectedCampaign
              ? ""
              : this.state.campaigns[
                  this.state.campaigns.findIndex(
                    (element, index, arr) =>
                      element.campaign_name === this.state.selectedCampaign
                  )
                ].campaign_id
          });
        }, 200);
      }
    render() {
        return (
          <div className="user-container">
          {this.redirect()}
            <span className="user-split-bar" />
            <NavigateUser
              userName={this.props.userName}
              location={this.props.location}
            />
    
            <div className="user-menu">
              <div className="menu-options">
                <h2>Join A Game</h2>
                <div className="menu-select">
                  <input name='roomCode' onChange={e=> this.handleChange(e)}
                  placeholder="Enter a room code"
                  />
                    <input name='tokenImg' onChange={e=> this.handleChange(e)}
                  placeholder="Enter your token image"
                  />
                     <input name='tokenName' onChange={e=> this.handleChange(e)}
                  placeholder="Enter your Token Name"
                  />
                 
                  <div className="menu-buttons">
                
                    <button
                      disabled={
                        !this.state.roomCode
                      }
                      onClick={()=> this.joinRoom()}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-menu">
              <div className="menu-options">
                <h2>Start Your Game</h2>
                <div className="menu-select">
                <select
                    name="selectedCampaign"
                    onChange={async e => {await this.handleChange(e);
                    await this.setState({index:this.state.campaigns.findIndex(element=>element.campaign_name===this.state.selectedCampaign)})
                    console.log('index:',this.state.index);
                    this.setState({myRoom:this.state.campaigns[this.state.index].room_code})
                    }}
                  >
                  
                    <option hidden>Choose Campaign</option>
                    {this.state.campaigns.map((element, index, arr) => {
                      return (
                        <option key={index} value={element.campaign_name}>
                          {element.campaign_name}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    name="selectedBoard"
                    onChange={e => this.handleChange(e)}
                  >
                  
                    <option hidden>Choose Board</option>
                    {this.state.boards.map((element, index, arr) => {
                      return (
                        <option key={index} value={element.board_name}>
                          {element.board_name}
                        </option>
                      );
                    })}
                  </select>
                 
                  <div className="menu-buttons">
                  {this.state.index<this.state.campaigns.length && this.state.index > -1?
                  <Link to={`/game/waitroom/${this.state.myRoom}/${this.state.campaigns[this.state.index].campaign_id}/${this.state.selectedBoard}`}>
                  <button
                      disabled={this.state.selectedBoard === '' || this.state.selectedCampaign === ''}
                      onClick={()=>{console.log('this.state.myRoom:',this.state.myRoom); console.log('campaign_id:',this.state.campaigns[this.state.index].campaign_id); console.log('this.state.selectedBoard:',this.state.selectedBoard)}}
                    >
                      Confirm
                </button></Link>
                :
                <button
                      disabled={this.state.selectedBoard === '' || this.state.selectedCampaign === ''}
                      onClick={()=>{console.log('this.state.myRoom:',this.state.myRoom); console.log('campaign_id:',this.state.campaigns[this.state.index].campaign_id); console.log('this.state.selectedBoard:',this.state.selectedBoard)}}
                    >
                      Confirm
                </button>
                }
                  </div>
                </div>
              </div>
            </div>
           
          </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {updateJoin})(UserStartJoin);