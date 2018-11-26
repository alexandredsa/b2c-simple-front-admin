// Services
import {
    getStudents
} from './Services';


// Actions
export const load = () => {
    return (dispatch, state) => {
        const token = state().loginStore.auth.token
        return new Promise((resolve, reject) => {
            getStudents(token)
                .then(response => {
                    dispatch(store(response))
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
        })
    }
}

export const store = (students) => {
    return {
        type: LOAD,
        students
    }
}

export const clear = () => {
    return {
        type: CLEAR
    }
}


// Reducers Interactions
// Constants
export const LOAD = 'LOAD_STUDENTS';
export const CLEAR = 'CLEAR';