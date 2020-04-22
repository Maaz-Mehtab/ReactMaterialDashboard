import * as util from "../../helper/Utilities";
import Axios from "axios";


const url = `${util.baseURL}/user`;
export function getAllUsers(payload) {
    return Axios.get(`${url}/getAllUsers`, {
        headers: util.httpHeaders()
    })
}
