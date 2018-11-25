// Services
import {
    getToken
} from './Services';


// Actions
export const authUser = (username, password) => {
    return (dispatch, state) => {
        return new Promise((resolve, reject) => {
            getToken(username, password).then(response => {
                dispatch(setAuthToStore(response))
                resolve(response)
            }).catch(error => reject(error))
        })
    }
}

export const hasAuthenticatedUser = () => {
    return (dispatch, state) => {
        const auth = state().authStore.auth;
        return auth && auth.id > 0;
    }
}


// Reducers Interactions
// Constants
export const SET_AUTH_TO_STORE = 'SET_AUTH_TO_STORE'
export const SET_SESSION_ID_TO_STORE = 'SET_SESSION_ID_TO_STORE'
export const CLEAR = 'CLEAR'

export const clear = () => {
    return {
        type: 'CLEAR'
    }
}

export const setAuthToStore = (auth) => {
    return {
        type: SET_AUTH_TO_STORE,
        auth
    }
}
