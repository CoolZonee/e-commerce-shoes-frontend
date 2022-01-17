import axios from 'axios';

const urlPrefix = process.env.REACT_APP_API_URL;

export const login = async (payload: any) => {
    return await axios.post(`${urlPrefix}/auth/login`, payload, { withCredentials: true })
        .then((res) => {
            // res.data;
            console.log(res);
            return res.data;
        })
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

export const getProductDetailsByUPC = async (upc: string) => {
    return await axios.get(`${urlPrefix}/product-details/${upc}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });;
}

export const getProductByGender = async (param: string) => {
    return await axios.get(`${urlPrefix}/product${param === '' ? '' : '?' + param}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });;
}

export const getUserDetails = async () => {
    return await axios.post(`${urlPrefix}/auth/user`, {}, {
        withCredentials: true,
        xsrfHeaderName: 'X-CSRFToken',
        xsrfCookieName: 'csrftoken',
    })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });;
}

export const refreshToken = async () => {
    return await axios.get(`${urlPrefix}/auth/token/refresh`, {
        withCredentials: true
    })
        .then(res => res.data)
        .catch(err => {
            throw err;
        });;
}

export const logOut = async () => {
    return await axios.post(`${urlPrefix}/auth/logout`, {}, {
        withCredentials: true,
        xsrfHeaderName: 'X-CSRFToken',
        xsrfCookieName: 'csrftoken',
    })
        .then(res => res)
        .catch(err => {
            throw err;
        });;
}