import history from '../History';
import Storage from './Storage';
// import swal from 'sweetalert';

export let localStorage_SaveKey = (key, value) => {
    localStorage.setItem(key, value);
}

export let localStorage_GetKey = (key) => {
    const value = localStorage.getItem(key);
    return value;

}

export let localStorage_RemoveKey = (key) => {
    localStorage.removeItem(key);
}

export const userType = [
    {
        id: 2,
        name: "Admin"
    },
    {
        id: 3,
        name: "Sales"
    },
    {
        id: 4,
        name: "Hospital"
    },
    {
        id: 5,
        name: "Client"
    },
]

export const discountType = [
    {
        id: 1,
        name: "Amount"
    },
    {
        id: 2,
        name: "Percent"
    },

]

// export const baseURL = "https://us-central1-testproject-98a49.cloudfunctions.net/api"
export const baseURL = "http://localhost:5001/testproject-98a49/us-central1/api"

export const emailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export const stringIsEmpty = (str) => {
    return (!str || /^\s*$/.test(str));
};

export const usersExist = (route, props) => {
    var response = localStorage_GetKey("token")
    if (response != null) {
        if (route == "/login" || route == "/signup" || route == "/Signup") {
            props.history.replace("/admin/dashboard")
        } else {
            props.history.replace(route)
        }
    }
    else {
        props.history.replace('/login')
    }
}


export const colors = {
    errorBackground: "#fdecea",
    errorText: "#611a15"
}

export const httpHeaders = () => {
    let token = localStorage_GetKey('token')
    return {
        'Authorization': `Bearer ${token}`
    }
}

export function makeRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// export const SweetAlert = (data) => {
//     swal({
//         title: data.title,
//         text: data.text,
//         icon: data.icon,
//         timer: 3000,
//         button: false
//     })
// }