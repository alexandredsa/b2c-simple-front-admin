
import axios from 'axios';

export const getToken = (login, password) => {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8090" + '/auth', {
            login,
            password
        })
            .then((response) => resolve(response.data))
            .catch((error) => {
                reject(error)
            })
    })
}
