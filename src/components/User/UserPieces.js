import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './User.css';
import NavigateUser from './NavigateUser.js';
import CreatePiece from './CreatePiece.js';

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
            selectedPiece:'',
            selectedImage:'',
            createPiece:false,
            name:'',
            type:'',
            x_coordinate:'',
            y_coordinate:'',
            image_url:'',
            index:-1
        }
        this.toggleCreatePiece = this.toggleCreatePiece.bind(this)
        this.handleCreatePiece = this.handleCreatePiece.bind(this)
    }

    async componentDidMount(){
        let a = await axios.get("/camp/get-camps");
        this.setState({campaigns:a.data});
    }

    async componentDidUpdate(prevProps,prevState){
        if (this.state.selectedCampaign != prevState.selectedCampaign){
            let myIndex = this.state.campaigns.findIndex(element=>element.campaign_name===this.state.selectedCampaign);
            await this.setState({selectedCampaignId:this.state.campaigns[myIndex].campaign_id})
            this.setState({boards:[],pieces:[],selectedBoard:'',selectedPiece:'',selectedImage:'',index:-1})
            let a = await axios.get(`/board/get-boards/${this.state.selectedCampaignId}`)
            this.setState({boards:a.data})
        }
        if (this.state.selectedBoard != prevState.selectedBoard){
            this.setState({pieces:[],selectedPiece:'',selectedImage:'',index:-1});
            let a = await axios.get(`/piece/get-pieces/${this.state.selectedCampaignId}/${this.state.selectedBoard}`)
            this.setState({pieces:a.data})
        }
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleCreatePiece(){
        this.setState({
            createPiece:!this.state.createPiece
        })
    }

    async edit(){
        let a = await axios.put(`/piece/edit`,{campaign_id:this.state.selectedCampaignId,board_name:this.state.selectedBoard,character_name:this.state.pieces[this.state.index].character_name,new_character_name:this.state.name,piece_type:this.state.piece_type,x_coordinate:this.state.x_coordinate,y_coordinate:this.state.y_coordinate,image_url:this.state.image_url});
        this.setState({selectedPiece:a.data[this.state.index].character_name});
        this.setState({pieces:a.data});
    }

    async delete(){
        let a = await axios.delete(`/piece/delete/${this.state.selectedCampaignId}/${this.state.selectedBoard}/${this.state.pieces[this.state.index].character_name}`)
        this.setState({selectedPiece:'',index:-1,pieces:a.data});
    }

    async handleCreatePiece(campaign_id,board_name,character_name,piece_type,x_coordinate,y_coordinate,image_url){
        let a = await axios.post('/piece/create',{campaign_id,board_name,character_name,piece_type,x_coordinate,y_coordinate,image_url})
        this.setState({pieces:a.data});
    }

    render(){
        return(
            <div className='nn'>
            <CreatePiece
                selectedCampaign={this.state.selectedCampaign}
                selectedCampaignId={this.state.selectedCampaignId}
                selectedBoard={this.state.selectedBoard}
                visible={this.state.createPiece}
                toggleCreatePiece={this.toggleCreatePiece}
                handleCreatePiece={this.handleCreatePiece}
            />
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
                            <button onClick={()=>this.toggleCreatePiece()} disabled={this.state.selectedCampaign === '' || this.state.selectedBoard===''}>Create</button>
                            <button disabled={this.state.selectedCampaign === '' || this.state.selectedBoard==='' || this.state.selectedPiece==='' || 
                        this.state.index === -1 
                        ||  (this.state.name === this.state.pieces[this.state.index].character_name 
                            &&
                        this.state.type === this.state.pieces[this.state.index].piece_type &&
                        this.state.x_coordinate === this.state.pieces[this.state.index].x_coordinate &&
                        this.state.y_coordinate === this.state.pieces[this.state.index].y_coordinate &&
                        this.state.image_url === this.state.pieces[this.state.index].image_url)
                        } onClick={()=>this.edit()}>Edit</button>
                            <button disabled={this.state.selectedCampaign === '' || this.state.selectedBoard==='' || this.state.selectedPiece===''} onClick={()=>this.delete()}>Delete</button>
                        </div>
                        <div className='section-for-selecting-campaign' id='ppp'>
                                <h2 className='lllk'>Piece</h2>
                                <select
                                    name="selectedPiece"
                                    disabled={this.state.selectedCampaign === "" || this.state.selectedBoard===''}
                                    onChange={async e => {await this.handleChange(e); 
                                    let index = this.state.pieces.findIndex(element=>element.character_name===this.state.selectedPiece);
                                    this.setState({index,selectedImage:this.state.pieces[index].image_url})
                                    this.setState({name:this.state.pieces[index].character_name,type:this.state.pieces[index].piece_type,x_coordinate:this.state.pieces[index].x_coordinate,y_coordinate:this.state.pieces[index].y_coordinate,image_url:this.state.pieces[index].image_url})
                                    }}
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
                                    {this.state.selectedImage===''?null:<img src={this.state.selectedImage} alt/>}
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
                                <div className='ttgtg'><h5 className='gtgtt'><input name='name' onChange={e=>this.handleChange(e)} value={this.state.name} className='me-me-i-type' disabled={this.state.selectedCampaign==='' || this.state.selectedBoard==='' || this.state.selectedPiece===''}></input></h5></div>
                                <div className='ttgtg'><h5 className='gtgtt'><select name='type' onChange={e=>this.handleChange(e)} value={this.state.type} className='me-me-i-select' disabled={this.state.selectedCampaign==='' || this.state.selectedBoard==='' || this.state.selectedPiece===''}>
                                    <option value='baggai'>Baggai</option>
                                    <option value='npc'>NPC</option>
                                </select></h5></div>
                                <div className='ttgtg'><h5 className='gtgtt'><input name='x_coordinate' onChange={e=>this.handleChange(e)} value={this.state.x_coordinate} className='me-me-i-type' type='number' disabled={this.state.selectedCampaign==='' || this.state.selectedBoard==='' || this.state.selectedPiece===''}></input></h5></div>
                                <div className='ttgtg'><h5 className='gtgtt'><input name='y_coordinate' onChange={e=>this.handleChange(e)} value={this.state.y_coordinate} className='me-me-i-type' type='number' disabled={this.state.selectedCampaign==='' || this.state.selectedBoard==='' || this.state.selectedPiece===''}></input></h5></div>
                                <div className='ttgtg'><h5 className='gtgtt'><input name='image_url' onChange={e=>this.handleChange(e)} value={this.state.image_url} className='me-me-i-type' disabled={this.state.selectedCampaign==='' || this.state.selectedBoard==='' || this.state.selectedPiece===''}></input></h5></div>
                            </div>
                        </div>
                            <button disabled={
                                this.state.index === -1 
                                ||  (this.state.name === this.state.pieces[this.state.index].character_name 
                                    &&
                                this.state.type === this.state.pieces[this.state.index].piece_type &&
                                this.state.x_coordinate === this.state.pieces[this.state.index].x_coordinate &&
                                this.state.y_coordinate === this.state.pieces[this.state.index].y_coordinate &&
                                this.state.image_url === this.state.pieces[this.state.index].image_url)
                            } className='knbg' onClick={()=>{
                                this.setState({name:this.state.pieces[this.state.index].character_name,
                                    type:this.state.pieces[this.state.index].piece_type,
                                    x_coordinate:this.state.pieces[this.state.index].x_coordinate,
                                    y_coordinate:this.state.pieces[this.state.index].y_coordinate,
                                    image_url:this.state.pieces[this.state.index].image_url
                                })
                            }}>Cancel</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(UserPieces);