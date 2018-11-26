import {
    REPLACE, ADD, UPDATE, CLEAR
} from './Actions'

// Initial State
const initialState = {
    users: [],
}

// Reducer
const UserReducers = (state = initialState, action) => {
    switch (action.type) {
        case REPLACE:
            return {
                ...state,
                users: action.users,
            }
        case ADD:
            return {
                ...state,
                users: [...state.users, action.user],
            }
        case UPDATE:
            return {
                ...state,
                users: state.users.map(u => u._id == action.user._id ? action.user : u),

            }
        case CLEAR:
            return {
                ...state,
                users: []
            }
        default:
            return state
    }
}

export default UserReducers
