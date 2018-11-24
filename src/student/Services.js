
import axios from 'axios';

export const getStudents = (token) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                "app-token": token
            }
        };

        axios.get("http://localhost:8090" + '/students', config)
            .then((response) => resolve(response.data))
            .catch((error) => {
                reject(error)
            })
    })
}
