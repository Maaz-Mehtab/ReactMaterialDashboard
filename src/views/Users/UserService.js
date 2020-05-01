import * as util from "../../helper/Utilities";
import Axios from "axios";


const url = `${util.baseURL}/users`;

export function getAllUsers(params) {
    return Axios.get(`${url}/getAllUsers`, {
        headers: util.httpHeaders(),
        params: params
    })
}

export function getSpecificUser(params) {
    return Axios.get(`${url}/getSpecificUser`, {
        headers: util.httpHeaders(),
        params: params
    })
}

export function update(payload) {
    return Axios.post(`${url}/update`, payload, {
        headers: util.httpHeaders(),
    })
}
export function updateProfile(payload) {
    return Axios.post(`${url}/updateProfile`, payload, {
        headers: util.httpHeaders(),
    })
}

export function updateProfileImage(payload) {
    return Axios.post(`${url}/updateProfileImage`, payload, {
        headers: util.httpHeaders(),
    })
}