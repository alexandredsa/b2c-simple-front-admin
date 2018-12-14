import axios from 'axios';

export const getStudents = (token, registeredBy) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                "app-token": token
            }
        };

        axios.get(API_URL + `/students?registeredBy=${registeredBy}`, config)
            .then((response) => resolve(response.data))
            .catch((error) => {
                reject(error)
            })
    })
}

export const exportCsv = (token, registeredBy) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                "app-token": token
            }
        };

        axios.get(API_URL + `/xls/relatorio.xlsx?registeredBy=${registeredBy}`, config)
            .then((response) => resolve(response.data))
            .catch((error) => {
                reject(error)
            })
    })
}
