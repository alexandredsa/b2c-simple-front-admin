// Services
import * as services from './Services';


// Actions
export const load = (registeredBy) => {
    return (dispatch, state) => {
        const token = state().loginStore.auth.token
        return new Promise((resolve, reject) => {
            services.getStudents(token, registeredBy)
                .then(response => {
                    dispatch(store(response))
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
        })
    }
}

export const exportCsv = (registeredBy) => {
    return (dispatch, state) => {
        const token = state().loginStore.auth.token
        return new Promise((resolve, reject) => {
            services.exportCsv(token, registeredBy)
                .then(response => {
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