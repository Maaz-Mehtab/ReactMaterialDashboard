import * as util from "../../helper/Utilities";
import Axios from "axios";


const url = `${util.baseURL}/orders`;

export function getAllOrders(params) {
    return Axios.get(`${url}/getAllOrders`, {
        headers: util.httpHeaders(),
        params: params
    })
}
