import React, { Component } from "react";
import ArrowUp from "../SVG/ArrowUp";
import ArrowDown from "../SVG/ArrowDown";
import { Link } from "react-router-dom";
import ConfirmDeletion from "./ConfirmDeletion.js";
import CreateCampaign from "./CreateCampaign.js";
import EditCampaign from "./EditCampaign.js";
import CreateBoard from "./CreateBoard.js";
import EditBoard from "./EditBoard.js";
import ConfirmDeleteBoard from "./ConfirmDeleteBoard.js";
import "./User.css";
import NavigateUser from "./NavigateUser.js";
import axios from "axios";
import { connect } from "react-redux";
import { updateCampaignId, updateJoin } from "../../dux/reducer";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campaigns: [],
      boards: [],
      pieces: [],
      selectedCampaign: "",
      selectedRoomCode: "",
      selectedCampaignId: "",
      selectedPiece: "",
      boardCol: 5,
      boardRow: 5,
      edit: false,
      areYouSure: false,
      createCampaign: false,
      editCampaign: false,
      createBoard: false,
      editBoard: false,
      areYouSure: false,
      selectedBoard: "",
      defaultBoard: "",
      name: "",
      roomCode: ""
    };
    this.toggleAreYouSure = this.toggleAreYouSure.bind(this);
    this.toggleCreateCampaign = this.toggleCreateCampaign.bind(this);
    this.toggleEditCampaign = this.toggleEditCampaign.bind(this);
    this.createCampaign = this.createCampaign.bind(this);
    this.startGame = this.startGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editCampaign = this.editCampaign.bind(this);
  }

  async componentDidMount() {
    let a = await axios.get("/camp/get-camps");
    this.setState({ campaigns: a.data });
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

  async createCampaign() {
    let res = await axios.post("/camp/create", {
      campName: this.state.name,
      roomCode: this.state.roomCode
    });
    this.setState({
      campaigns: res.data
    });
  }

  async editCampaign() {
    let res = await axios.put("/camp/edit-name-room", {
      campName: this.state.selectedCampaign,
      newCampName: this.state.name,
      newRoomCode: this.state.roomCode
    });
    this.setState({
      campaigns: res.data
    });
  }

  async createBoard() {
    await axios.post("/board/create", {
      campaign_id: this.state.selectedCampaignId,
      board_name: this.state.name,
      board_row: this.state.boardRow,
      board_col: this.state.board_col
    });
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

  toggleAreYouSure() {
    this.setState({
      areYouSure: !this.state.areYouSure
    });
  }

  toggleEditCampaign() {
    this.setState({
      editCampaign: !this.state.editCampaign
    });
  }

  toggleCreateCampaign() {
    this.setState({
      createCampaign: !this.state.createCampaign
    });
  }

  async makeDefaultBoard() {
    let a = await axios.put("/board/make-starting", {
      campaign_id: this.state.selectedCampaignId,
      board_name: this.state.selectedBoard
    });
    let b = a.data.findIndex(
      (element, index, arr) => element.starting === true
    );
    this.setState({ defaultBoard: a.data[b].board_name });
  }

  startGame() {
    this.props.updateCampaignId(this.state.selectedCampaignId);
    let data = { roomCode: this.state.selectedRoomCode };
    this.props.updateJoin(data);
  }

  toggle = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  };

  render() {
    return (
      <div className="user-container">
        <span className="user-split-bar" />
        <NavigateUser
          userName={this.props.userName}
          location={this.props.location}
        />
        <ConfirmDeletion
          selectedCampaign={this.state.selectedCampaign}
          visible={this.state.areYouSure}
          toggleConfirmDeletion={this.toggleAreYouSure}
        />

        <div className="user-menu">
          <div className="menu-options">
            <h2>Campaigns</h2>
            <div className="menu-select">
              <select
                name="selectedCampaign"
                onChange={e => this.handleChange(e)}
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
              <div className="menu-buttons">
                <button name="createCampaign" onClick={this.toggle}>
                  Create
                </button>
                <button
                  disabled={!this.state.selectedCampaign}
                  name="editCampaign"
                  onClick={this.toggle}
                >
                  Edit
                </button>
                <button
                  disabled={!this.state.selectedCampaign}
                  name="areYouSure"
                  onClick={this.toggle}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="menu-edit-delete">
              <input
                name="name"
                onChange={this.handleChange}
                disabled={
                  !this.state.editCampaign && !this.state.createCampaign
                }
                placeholder={
                  !this.state.editCampaign && !this.state.createCampaign
                    ? "Edit or Create a Campaign"
                    : this.state.selectedCampaign
                }
              />
              <input
                name="roomCode"
                onChange={this.handleChange}
                disabled={
                  !this.state.editCampaign && !this.state.createCampaign
                }
                placeholder={
                  !this.state.editCampaign && !this.state.createCampaign
                    ? "Edit or Create a Campaign"
                    : this.state.selectedRoomCode
                }
              />
              <div className="menu-buttons">
                <button
                  disabled={
                    !this.state.editCampaign && !this.state.createCampaign
                  }
                  onClick={() =>
                    this.setState({
                      editCampaign: false,
                      createCampaign: false
                    })
                  }
                >
                  Cancel
                </button>
                <button
                  disabled={
                    !this.state.editCampaign && !this.state.createCampaign
                  }
                  onClick={
                    this.state.createCampaign
                      ? () => {
                          this.createCampaign();
                        }
                      : () => {
                          this.editCampaign();
                        }
                  }
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="user-menu">
          <div className="menu-options">
            <h2>Boards</h2>
            <div className="menu-select">
              <select
                name="selectedBoard"
                disabled={this.state.selectedCampaign === ""}
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
                <button
                  disabled={!this.state.selectedCampaign}
                  name="createBoard"
                  onClick={this.toggle}
                >
                  Create
                </button>
                <button
                  name="editBoard"
                  onClick={this.toggle}
                  disabled={!this.state.selectedBoard}
                >
                  Edit
                </button>
                <button disabled={!this.state.selectedBoard}>Delete</button>
              </div>
            </div>
            <div className="menu-edit-delete">
              <input
                ref="input"
                disabled={!this.state.editBoard && !this.state.createBoard}
                placeholder={
                  !this.state.editBoard && !this.state.createBoard
                    ? "Edit or Create a board"
                    : this.state.selectedBoard
                }
              />

              {this.state.editBoard || this.state.createBoard ? (
                <div className="col-row-select">
                  <h2
                    className="enabled-colrow-select"
                    style={{ color: "rgb(200,200,200)" }}
                  >
                    {this.state.boardCol}
                  </h2>
                  <div className="arrow-container">
                    <ArrowUp phil="enabled" />
                    <ArrowDown phil="enabled" />
                  </div>
                  <h2
                    className="enabled-colrow-select"
                    style={{ color: "rgb(200,200,200)" }}
                  >
                    {this.state.boardRow}
                  </h2>
                  <div className="arrow-container">
                    <ArrowUp phil="enabled" />
                    <ArrowDown phil="enabled" />
                  </div>
                </div>
              ) : (
                <div className="col-row-select">
                  <h2 className="disabled-colrow-select">0</h2>
                  <div className="arrow-container">
                    <ArrowUp phil="disabled" />
                    <ArrowDown phil="disabled" />
                  </div>
                  <h2 className="disabled-colrow-select">0</h2>
                  <div className="arrow-container">
                    <ArrowUp phil="disabled" />
                    <ArrowDown phil="disabled" />
                  </div>
                </div>
              )}
              <div className="menu-buttons">
                <button
                  disabled={!this.state.editBoard && !this.state.createBoard}
                  onClick={() => {
                    this.setState({ editBoard: false, createBoard: false });
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={!this.state.editBoard && !this.state.createBoard}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
        <ConfirmDeleteBoard
          visible={this.state.deleteBoard}
          toggle={this.toggle}
          selectedBoard={this.state.selectedBoard}
          selectedCampaignId={this.state.selectedCampaignId}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { updateCampaignId, updateJoin }
)(User);
