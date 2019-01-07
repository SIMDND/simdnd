import React, {Component} from 'react';
import ConfirmDeletion from './ConfirmDeletion.js';
import CreateCampaign from './CreateCampaign.js';
import './User.css'
import axios from 'axios';

class User extends Component{
    constructor(props){
        super(props);

        this.state = {
            campaigns:[],
            selectedCampaign:'',
            desiredCampaign:'',
            desiredRoomCode:'',
            displayCreateInputs:false,
            edit:false,
            areYouSure:false,
            createCampaign:false
        }
        this.toggleAreYouSure = this.toggleAreYouSure.bind(this)
        this.toggleCreateCampaign = this.toggleCreateCampaign.bind(this)
    }

    async componentDidMount(){
        let a = await axios.get('/camp/get-camps');
        let b = a.data;
        b.unshift('');
        this.setState({campaigns:b})
    }

    async componentDidUpdate(prevProps,prevState){
        if (this.state.campaigns != prevState.campaigns){
            let a = await axios.get('/camp/get-camps');
            let b = a.data;
            b.unshift('');
            this.setState({campaigns:b})
        }
    }

    displayCampaigns(){
        return this.state.campaigns.map((element,index,arr)=>{
            return <option value={element}>element</option>
        })
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    displayCreateInputs(){
        if (this.state.displayCreateInputs){
            return (
                <div>
                    <h3>Campaign Name:<input name = 'desiredCampaign' maxlength="40"/></h3>
                    <h3>Room Code:<input name = 'desiredRoomCode' maxlength="40"/></h3>
                    <button onClick={()=>this.setState({displayCreateInputs:false})}>Cancel</button><button>Add</button>
                </div>
            )
        }
    }

    displayEdit(){
        if (this.state.edit && this.state.selectedCampaign!=''){
            return (
                <h3>Aaron is so cool</h3>
            )
        }
    }

    toggleAreYouSure(){
        this.setState({
          areYouSure: !this.state.areYouSure
        })
      }

      toggleCreateCampaign(){
          this.setState({
              createCampaign: !this.state.createCampaign
          })
      }

    render(){
        return (
            <div>
            <ConfirmDeletion selectedCampaign={this.state.selectedCampaign} visible={this.state.areYouSure} toggleConfirmDeletion={this.toggleAreYouSure}/>
            <CreateCampaign visible={this.state.createCampaign} toggleCreateCampaign={this.toggleCreateCampaign}/>
            <div className='user'>
                {!this.props.userName?
                <div>
                    You are not logged in.
                </div>:
                <div>
                    <h2>Select a Campaign</h2>
                    <div className='campaign-options'>
                        <button disabled={this.state.selectedCampaign===''} onClick={()=>this.setState({edit:this.state.selectedCampaign?true:false})}>Edit</button>
                        <button disabled={this.state.selectedCampaign===''} onClick={()=>this.toggleAreYouSure()}>Delete</button>
                    </div>
                    <select name='selectedCampaign' onChange={e=>this.handleChange(e)}>
                        {this.state.campaigns.map((element,index,arr)=>{return <option value={element.campaign_name}>{element.campaign_name}</option>})}
                    </select>
                    <div>
                    <button onClick={()=>this.toggleCreateCampaign()}>Create</button>
                    {this.displayCreateInputs()}
                    {this.displayEdit()}
                    
                        
                        </div>
                </div>
            
            }
            </div>
            </div>
        )
    }
}

export default User;