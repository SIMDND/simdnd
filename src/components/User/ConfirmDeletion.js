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
            <div className={this.state.visible? "Modal": "invisible"}>

            </div>
        )
    }
}

export default ConfirmDeletion;