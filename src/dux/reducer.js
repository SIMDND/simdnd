const initialState={
    user: {},
    join: {},
    campaignId: null
}
const CAMPAIGN_ID='CAMPAIGN_ID'
const UPDATE_USER = "UPDATE_USER"
const JOIN = 'JOIN'
export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user,
    }
}
export function updateJoin(player){
    return {
        type:JOIN,
        payload:player
    }
}
export function updateCampaignId(id){
    return{
        type:CAMPAIGN_ID,
        payload: id
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_USER:
        return {...state, user: action.payload}
        case JOIN:
        return {...state, join:action.payload}
        case CAMPAIGN_ID:
        return {...state, campaignId:action.payload}
        default:
        return state
    }
}