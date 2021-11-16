import axios from 'axios';

const urlPrefix = process.env.REACT_APP_API_URL;

export const login = async (payload: any) => {
    return await axios.post(`${urlPrefix}/login/`, payload)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
}

export const getGender = async () => {
    return await axios.get(`${urlPrefix}/gender/`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
}

export const getProductByUPC = async (upc: string) => {
    return await axios.get(`${urlPrefix}/product/${upc}/`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
}

export const getProductList = async () => {
    return await axios.get(`${urlPrefix}/product`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });;
}