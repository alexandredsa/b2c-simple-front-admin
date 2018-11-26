// Services
import { listUsers, addUser, updateUser } from './Services';


// Actions
export const list = () => {
    return (dispatch, state) => {
        const token = state().loginStore.auth.token
        return new Promise((resolve, reject) => {
            listUsers(token)
                .then(response => {
                    dispatch(replaceUsers(response))
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
        })
    }
}


// Actions
export const add = (user) => {
    return (dispatch, state) => {
        const token = state().loginStore.auth.token
        return new Promise((resolve, reject) => {
            addUser(token, user)
                .then(response => {
                    dispatch(addToStore(response))
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
        })
    }
}

export const update = (user) => {
    return (dispatch, state) => {
        const token = state().loginStore.auth.token
        return new Promise((resolve, reject) => {
            updateUser(token, user)
                .then(response => {
                    dispatch(updateToStore(response))
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
        })
    }
}

export const replaceUsers = (users) => {
    return {
        type: REPLACE,
        users
    }
}

export const addToStore = (user) => {
    return {
        type: ADD,
        user
    }
}

export const updateToStore = (user) => {
    return {
        type: UPDATE,
        user
    }
}

export const clear = () => {
    return {
        type: CLEAR
    }
}


// Reducers Interactions
// Constants
export const REPLACE = 'REPLACE_USERS';
export const CLEAR = 'CLEAR';
export const ADD = 'ADD_USERS';
export const UPDATE = 'UPDATE_USERS';