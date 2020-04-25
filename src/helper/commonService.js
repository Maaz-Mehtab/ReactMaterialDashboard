import * as util from "./Utilities";
import Axios from "axios";


const url = `${util.baseURL}/common`;

export function getCustomersForSelect(params) {
    return Axios.get(`${url}/getCustomersForSelect`, {
        headers: util.httpHeaders(),
        params: params
    })
}