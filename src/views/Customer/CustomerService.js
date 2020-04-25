import * as util from "../../helper/Utilities";
import Axios from "axios";


const url = `${util.baseURL}/customers`;

export function getAllCustomers(params) {
    return Axios.get(`${url}/getAllCustomers`, {
        headers: util.httpHeaders(),
        params: params
    })
}
export function getSpecificCustomer(params) {
    return Axios.get(`${url}/getSpecificCustomer`, {
        headers: util.httpHeaders(),
        params: params
    })
}

export function update(payload) {
    return Axios.post(`${url}/update`, payload, {
        headers: util.httpHeaders(),
    })
}
export function addCustomer(payload) {
    return Axios.post(`${url}/addCustomer`, payload, {
        headers: util.httpHeaders(),
    })
}

