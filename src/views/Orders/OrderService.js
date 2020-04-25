import * as util from "../../helper/Utilities";
import Axios from "axios";


const url = `${util.baseURL}/orders`;

export function getAllOrders(params) {
    return Axios.get(`${url}/getAllOrders`, {
        headers: util.httpHeaders(),
        params: params
    })
}

export function addOrder(payload) {
    return Axios.post(`${url}/addOrder`, payload, {
        headers: util.httpHeaders(),
    })
}