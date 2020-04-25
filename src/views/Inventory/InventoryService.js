import * as util from "../../helper/Utilities";
import Axios from "axios";


const url = `${util.baseURL}/inventory`;

export function getAllInventroy(params) {
    return Axios.get(`${url}/getAllInventory`, {
        headers: util.httpHeaders(),
        params: params
    })
}
export function getSpecificInventory(params) {
    return Axios.get(`${url}/getSpecificInventory`, {
        headers: util.httpHeaders(),
        params: params
    })
}

export function update(payload) {
    return Axios.post(`${url}/update`, payload, {
        headers: util.httpHeaders(),
    })
}
export function addInventory(payload) {
    return Axios.post(`${url}/addInventory`, payload, {
        headers: util.httpHeaders(),
    })
}
export function getAllInventoryForSelect() {
    return Axios.get(`${url}/getAllInventoryForSelect`, {
        headers: util.httpHeaders(),
    })
}
