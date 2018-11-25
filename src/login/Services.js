import axios from 'axios';

export const getToken = (login, password) => {
    return new Promise((resolve, reject) => {
        axios.post(API_URL + '/auth', {
            login,
            password
        })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error))
    })
}
