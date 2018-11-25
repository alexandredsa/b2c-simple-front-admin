import axios from 'axios';

export const getStudents = (token) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                "app-token": token
            }
        };

        axios.get(API_URL + '/students', config)
            .then((response) => resolve(response.data))
            .catch((error) => {
                reject(error)
            })
    })
}
