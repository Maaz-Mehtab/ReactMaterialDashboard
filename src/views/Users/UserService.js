import * as util from "../../helper/Utilities";
import Axios from "axios";


const url = `${util.baseURL}/users`;
export function getAllUsers(params) {
    return Axios.get(`${url}/getAllUsers`, {
        headers: util.httpHeaders(),
        params: params
    })
}
