import React, {Component} from 'react';
import '../Login-Register/Login-Register.css';

class ConfirmDeletion extends Component{
    constructor(props){
        super(props);

        this.state = {
            visible:this.props.visible
        }
    }


    componentDidMount(){

    }

    componentDidUpdate(){

    }

    render(){
        return (
            <div id='z' className={this.state.visible? "Modal-content": "invisible"}>
                <h1>Are you sure you want to delete {this.props.selectedCampaign}?</h1>
                <div className = 'Modal-buttons'>
                <button>Confirm</button><button onClick={()=>this.setState({visible:!this.state.visible})}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default ConfirmDeletion;