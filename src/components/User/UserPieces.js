import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './User.css'
import NavigateUser from './NavigateUser.js'
import './User.css'

class UserPieces extends Component{
    constructor(props){
        super(props);

        this.state={
            campaigns:[],
            selectedCampaignId:-1,
            selectedCampaign:'',
            boards:[],
            selectedBoard:'',
            pieces:[],
            selectedPiece:''
        }
    }

    async componentDidMount(){
        let a = await axios.get("/camp/get-camps");
        this.setState({campaigns:a.data});
    }

    async componentDidUpdate(prevProps,prevState){
        if (this.state.selectedCampaign != prevState.selectedCampaign){
            let myIndex = this.state.campaigns.findIndex(element=>element.campaign_name===this.state.selectedCampaign);
            await this.setState({selectedCampaignId:this.state.campaigns[myIndex].campaign_id})
            this.setState({boards:[],pieces:[],selectedBoard:'',selectedPiece:''})
            let a = await axios.get(`/board/get-boards/${this.state.selectedCampaignId}`)
            this.setState({boards:a.data})
        }
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        return(
            <div className="user-container">
                <NavigateUser userName={this.props.userName}></NavigateUser>
                <div className='wide-screen'>
                    <div className='board-and-campaign-portion'>
                    <h1 className='eeeee'>Select Campaign and Board</h1>
                        <div className='bigger-square-inside-board-and-campaign-portion'>
                            <div className='section-for-selecting-campaign'>
                                <h2 className='lllk'>Campaign</h2>
                                <select
                                    name="selectedCampaign"
                                    onChange={e => this.handleChange(e)}
                                    className='selector-thing'
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
                            </div>
                            <div className='section-for-selecting-board'>
                                <h2 className='lllk'>Board</h2>
                                <select
                                    name="selectedBoard"
                                    disabled={this.state.selectedCampaign === ""}
                                    onChange={e => this.handleChange(e)}
                                    className='selector-thingy'
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
                            </div>
                        </div>
                    </div>
                    <div className='pieces-portion'>
                        <h1 className='eeeef'>Pieces</h1>
                        <div className = 'option-stuffs'>
                            <button disabled={this.state.selectedCampaign === '' || this.state.selectedBoard===''}>Create</button>
                            <button disabled={this.state.selectedCampaign === '' || this.state.selectedBoard==='' || this.state.selectedPiece===''}>Edit</button>
                            <button disabled={this.state.selectedCampaign === '' || this.state.selectedBoard==='' || this.state.selectedPiece===''}>Delete</button>
                        </div>
                        <div className='section-for-selecting-campaign'>
                                <h2 className='lllk'>Piece</h2>
                                <select
                                    name="selectedPiece"
                                    disabled={this.state.selectedCampaign === "" || this.state.selectedBoard===''}
                                    onChange={e => this.handleChange(e)}
                                    className='selector-thingy'
                                >
                                    <option hidden>Choose Piece</option>
                                    {this.state.pieces.map((element, index, arr) => {
                                    return (
                                        <option key={index} value={element.character_name}>
                                        {element.character_name}
                                        </option>
                                    );
                                    })}
                                </select>
                            </div>
                            <div className='make-room'>

                            </div>
                        <div className='holder-of-piece-image'>

                        </div>
                        <div className='make-room'>

                        </div>
                        <div className='box-for-displaying-piece-characteristics'>
                            <div className='to-list-each-characteristic'>
                                    <div className='ttgtg' id='ttgtg'><h5 className='ggtgt'>Name:</h5></div>
                                    <div className='ttgtg' id='ttgtg'><h5 className='ggtgt'>Type:</h5></div>
                                    <div className='ttgtg' id='ttgtg'><h5 className='ggtgt'>X-Coordinate:</h5></div>
                                    <div className='ttgtg' id='ttgtg'><h5 className='ggtgt'>Y-Coordinate:</h5></div>
                                    <div className='ttgtg' id='ttgtg'><h5 className='ggtgt'>Image URL:</h5></div>
                                    
                            </div>
                            <div className='to-show-and-allow-to-alter-each-characteristic'>
                                <div className='ttgtg'><h5 className='gtgtt'><input className='me-me-i-type' disabled={this.state.selectedCampaign==='' || this.state.selectedBoard==='' || this.state.selectedPiece===''}></input></h5></div>
                                <div className='ttgtg'><h5 className='gtgtt'><select className='me-me-i-select' disabled={this.state.selectedCampaign==='' || this.state.selectedBoard==='' || this.state.selectedPiece===''}></select></h5></div>
                                <div className='ttgtg'><h5 className='gtgtt'><input className='me-me-i-type' type='number' disabled={this.state.selectedCampaign==='' || this.state.selectedBoard==='' || this.state.selectedPiece===''}></input></h5></div>
                                <div className='ttgtg'><h5 className='gtgtt'><input className='me-me-i-type' type='number' disabled={this.state.selectedCampaign==='' || this.state.selectedBoard==='' || this.state.selectedPiece===''}></input></h5></div>
                                <div className='ttgtg'><h5 className='gtgtt'><input className='me-me-i-type' disabled={this.state.selectedCampaign==='' || this.state.selectedBoard==='' || this.state.selectedPiece===''}></input></h5></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(UserPieces);