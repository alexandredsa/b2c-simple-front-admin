// Import Actions
import {
    SET_AUTH_TO_STORE, CLEAR
} from './Actions'

// Initial State
const initialState = {
    auth: {},
}

// Reducer
const AuthReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_TO_STORE:
            return {
                ...state,
                auth: action.auth,
            }
        case CLEAR:
            return {
                ...state,
                auth: {}
            }
        default:
            return state
    }
}

export default AuthReducers
