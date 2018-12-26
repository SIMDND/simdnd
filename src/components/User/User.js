import React, {Component} from 'react';
import ConfirmDeletion from './ConfirmDeletion.js';
import './User.css'

class User extends Component{
    constructor(props){
        super(props);

        this.state = {
            campaigns:['','aajjjjjjjjjjjj','hy','mt'],
            selectedCampaign:'',
            desiredCampaign:'',
            desiredRoomCode:'',
            displayCreateInputs:false,
            edit:false,
            displayAreYouSure:false
        }
    }

    componentDidMount(){
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

    displayAreYouSure(){
        if (this.state.displayAreYouSure){
            return (
                <div className='are-you-sure'>
    
                </div>
            )
        }
    }

    render(){
        return (
            <div className='user'>
                {!this.props.userName?
                <div>
                    You are not logged in.
                </div>:
                <div>
                    <h2>Select a Campaign</h2>
                    <div className='campaign-options'>
                        <button onClick={()=>this.setState({edit:this.state.selectedCampaign?true:false})}>Edit</button>
                        <button onClick={()=>this.setState({displayAreYouSure:this.state.selectedCampaign?true:false})}>Delete</button>
                    </div>
                    <select name='selectedCampaign' onChange={e=>this.handleChange(e)}>
                        {this.state.campaigns.map((element,index,arr)=>{return <option value={element}>{element}</option>})}
                    </select>
                    <div>
                    <button onClick={()=>this.setState({displayCreateInputs:true})}>Create</button>
                    {this.displayCreateInputs()}
                    {this.displayEdit()}
                    {this.displayAreYouSure()}
                    <ConfirmDeletion visible={false}></ConfirmDeletion>
                        </div>
                </div>
            
            }
            </div>
        )
    }
}

export default User;