import {
    LOAD, CLEAR
} from './Actions'

// Initial State
const initialState = {
    students: [],
}

// Reducer
const StudentReducers = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                students: action.students,
            }
        case CLEAR:
            return {
                ...state,
                students: [],
            }
        default:
            return state
    }
}

export default StudentReducers
