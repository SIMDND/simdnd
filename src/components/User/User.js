import React, {Component} from 'react';
import './User.css'

class User extends Component{
    constructor(props){
        super(props);

        this.state = {
            campaigns:['aajjjjjjjjjjjj','hy','mt'],
            selectedCampaign:''
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
        this.setState({selectedCampaign:e.target.value})
    }

    render(){
        return (
            <div className='user'>
                {this.props.userName?
                <div>
                    You are not logged in.
                </div>:
                <div>
                    <h2>Select a Campaign</h2>
                    <div className='campaign-options'>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                    <select onChange={e=>this.handleChange(e)}>
                        {this.state.campaigns.map((element,index,arr)=>{return <option value={element}>{element}</option>})}
                    </select>
                </div>}
            </div>
        )
    }
}

export default User;