import React, {Component} from 'react';
import ConfirmDeletion from './ConfirmDeletion.js';
import CreateCampaign from './CreateCampaign.js';
import EditCampaign from './EditCampaign.js';
import CreateBoard from './CreateBoard.js';
import EditBoard from './EditBoard.js';
import ConfirmDeleteBoard from './ConfirmDeleteBoard.js';
import './User.css'
import axios from 'axios';

class User extends Component{
    constructor(props){
        super(props);

        this.state = {
            campaigns:[],
            boards:[],
            selectedCampaign:'',
            selectedRoomCode:'',
            selectedCampaignId:'',
            desiredCampaign:'',
            desiredRoomCode:'',
            edit:false,
            areYouSure:false,
            createCampaign:false,
            editCampaign:false,
            createBoard:false,
            editBoard:false,
            selectedBoard:'',
            defaultBoard:''
        }
        this.toggleAreYouSure = this.toggleAreYouSure.bind(this)
        this.toggleCreateCampaign = this.toggleCreateCampaign.bind(this)
        this.toggleEditCampaign = this.toggleEditCampaign.bind(this)
    }

    async componentDidMount(){
        let a = await axios.get('/camp/get-camps');
        this.setState({campaigns:a.data})
    }

    async componentDidUpdate(prevProps,prevState){
        if (this.state.campaigns != prevState.campaigns){
            setTimeout(
                async () =>{
                    let a = await axios.get('/camp/get-camps');
                    this.setState({campaigns:a.data})

                }, 1000)

            }
        if (this.state.selectedCampaign !== prevState.selectedCampaign){
            setTimeout(
                async ()=>{
                let b = await axios.get(`/board/get-boards/${this.state.selectedCampaignId}`);
                this.setState({boards:b.data})
                console.log('boards:',this.state.boards)
            }
            ,200)
        }
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
        setTimeout(()=>{
            this.setState({selectedRoomCode:!this.state.selectedCampaign?'':this.state.campaigns[this.state.campaigns.findIndex((element,index,arr)=>element.campaign_name===this.state.selectedCampaign)].room_code})
            this.setState({selectedCampaignId:!this.state.selectedCampaign?'':this.state.campaigns[this.state.campaigns.findIndex((element,index,arr)=>element.campaign_name===this.state.selectedCampaign)].campaign_id})
        },200)
    }

    toggleAreYouSure(){
        this.setState({
          areYouSure: !this.state.areYouSure
        })
      }

      toggleEditCampaign(){
          this.setState({
              editCampaign:!this.state.editCampaign
          })
      }

      toggleCreateCampaign(){
          this.setState({
              createCampaign: !this.state.createCampaign
          })
      }

    //   toggleCreateBoard(){
    //       setTimeout(()=>{
    //           this.setState({
    //               createBoard: !this.state.createBoard
    //           })
    //       },200)
    //   }

    toggle = (e) =>{
        this.setState({
          [e.target.name]: !this.state[e.target.name]
        })
      }

    render(){
        console.log('campaigns',this.state.campaigns)
        return (
            <div>
            <ConfirmDeletion selectedCampaign={this.state.selectedCampaign} visible={this.state.areYouSure} toggleConfirmDeletion={this.toggleAreYouSure}/>
            <CreateCampaign visible={this.state.createCampaign} toggleCreateCampaign={this.toggleCreateCampaign}/>
            <EditCampaign visible = {this.state.editCampaign} toggleEditCampaign={this.toggleEditCampaign} selectedCampaign={this.state.selectedCampaign} selectedRoomCode={this.state.selectedRoomCode}/>
            <CreateBoard visible={this.state.createBoard} toggle={this.toggle} selectedBoard={this.state.selectedBoard} selectedCampaignId={this.state.selectedCampaignId}/>
            <EditBoard visible={this.state.editBoard} toggle={this.toggle}  selectedBoard={this.state.selectedBoard} selectedCampaignId={this.state.selectedCampaignId}/>
            <div className='user'>
                {!this.props.userName?
                <div>
                    You are not logged in.
                </div>:
                <div className='wow'>
                    <h2>Select a Campaign</h2>
                    <div className='campaign-options'>
                        <button disabled={this.state.selectedCampaign===''} onClick={()=>this.toggleEditCampaign()}>Edit</button>
                        <button disabled={this.state.selectedCampaign===''} onClick={()=>this.toggleAreYouSure()}>Delete</button>
                    </div>
                    <select name='selectedCampaign' onChange={e=>this.handleChange(e)}>
                        <option hidden>Choose Campaign</option>
                        {this.state.campaigns.map((element,index,arr)=>{return <option value={element.campaign_name}>{element.campaign_name}</option>})}
                    </select>
                    <button onClick={()=>this.toggleCreateCampaign()}>Create</button>

                    <div className= 'space'></div>
                        
                    <div className='default-board-title'>
                        <div className='default-title'><h2 className='huh'>Default Board:</h2></div>
                        <div className='thin'></div>
                        <div className='default-name'><h2 className='uh'>{this.state.selectedBoard===''?' No default yet':this.state.selectedBoard}</h2></div>
                    </div>
                    
                    <div className='campaign-options'>
                        <button disabled={this.state.selectedBoard===''} name="editBoard" onClick={this.toggle}>Edit</button>
                        <button disabled={this.state.selectedBoard===''}>Delete</button>
                    </div>
                    <select name='selectedBoard' disabled={this.state.selectedCampaign===''} onChange={e=>this.handleChange(e)}>
                        <option hidden>Choose Board</option>
                        {this.state.boards.map((element,index,arr)=>{return <option value={element.board_name}>{element.board_name}</option>})}
                    </select>
                    <div className='campaign-options'>
                        <button disabled={this.state.selectedBoard==='' || this.state.selectedBoard===this.state.defaultBoard}>Default</button>
                        <button disabled={this.state.selectedCampaign===''} name="createBoard" onClick={this.toggle}>Create</button>
                    </div>
                    <button disabled={this.state.selectedCampaign===''}>Start</button>
                </div>
            
            }
            </div>
            </div>
        )
    }
}

export default User;