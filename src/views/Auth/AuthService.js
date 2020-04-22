import * as util from "../../helper/Utilities";
import Axios from "axios";


const url = `${util.baseURL}/auth`;
export function login(payload) {
    return Axios.post(`${url}/login`, payload)
}
