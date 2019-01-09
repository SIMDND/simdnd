const initialState={
    user: {},
    join: {},
}

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

export default function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_USER:
        return {...state, user: action.payload}
        case JOIN:
        return {...state, join:action.payload}
        default:
        return state
    }
}