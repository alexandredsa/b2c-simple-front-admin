import axios from 'axios';

export const listUsers = (token) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                "app-token": token
            }
        };

        axios.get(API_URL + '/users', config)
            .then((response) => resolve(response.data))
            .catch((error) => {
                reject(error)
            })
    })
}


export const addUser = (token, user) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                "app-token": token
            }
        };

        axios.post(API_URL + '/users', user, config)
            .then((response) => resolve(response.data))
            .catch((error) => {
                reject(error)
            })
    })
}


export const updateUser = (token, user) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                "app-token": token
            }
        };

        axios.put(API_URL + `/users/${user._id}`, user, config)
            .then((response) => resolve(response.data))
            .catch((error) => {
                reject(error)
            })
    })
}