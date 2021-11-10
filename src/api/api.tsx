import axios from 'axios';

export const login = async (payload: any) => {
    return await axios.post("http://127.0.0.1:8000/login", payload)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
}

export const getGender = async () => {
    return await axios.get("http://127.0.0.1:8000/gender/")
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
}

export const getProductByUPC = async (upc: string) => {
    return await axios.get(`http://127.0.0.1:8000/product/${upc}/`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
}

export const getProductList = async () => {
    return await axios.get("http://127.0.0.1:8000/product/")
        .then(res => res.data)
        .catch(err => {
            throw err;
        });;
}