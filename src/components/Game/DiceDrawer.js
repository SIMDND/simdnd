import React, {Component} from 'react';
import d20 from 'd20'

class DiceDrawer extends Component{
    constructor(props){
        super(props);

        this.state = {
            roll:'',
            dice:''
        }
    }

    componentDidMount(){

    }
rollADice(num){
    
  let roll = d20.roll(num);
  this.setState({roll:roll})

}
handleChange(e){
    this.setState({
        dice:e.target.value
    })

}
    render(){
        return (
            <div>
                <button onClick={() => this.rollADice(20)}>
                    roll d20
                </button>
                <button onClick={()=> this.rollADice(4)}>
                roll D4
                </button>
                <button onClick={()=>this.rollADice(6)}>
                roll d6
                </button>
                <button onClick={()=> this.rollADice(8)}>
                roll d8
                </button>
                <button onClick={()=>this.rollADice(10)} >
                roll d10
                </button>
                <button onClick={()=>this.rollADice(12)}>
                roll d12
                </button>
                <input onChange={(e)=> this.handleChange(e)} />
                
                
                <button onClick={()=>this.rollADice(this.state.dice)}>
                Custom Roll
                </button>
            </div>
        )
    }
}

export default DiceDrawer;