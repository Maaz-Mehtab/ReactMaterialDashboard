import history from '../History';
import Storage from './Storage';
// import swal from 'sweetalert';
export let localStorage_SaveKey = async (key, value) => {
    try {
        await localStorage.setItem(key, value);
    } catch (error) {
        console.log("Error saving data" + error);
    }
}

export let localStorage_GetKey = async (key) => {
    try {
        const value = await localStorage.getItem(key);
        return value;
    } catch (error) {
        console.log("Error retrieving data" + error);
    }
}

export let localStorage_RemoveKey = async (key) => {
    try {
        await localStorage.removeItem(key);
    } catch (error) {
        console.log("Error resetting data" + error);
    }
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
export const baseURL = "http://localhost:5000/testproject-98a49/us-central1/api"

export const emailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export const stringIsEmpty = (str) => {
    return (!str || /^\s*$/.test(str));
};

export const usersExist = async (route, props) => {
    var response = await localStorage_GetKey("token")
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

// export const SweetAlert = (data) => {
//     swal({
//         title: data.title,
//         text: data.text,
//         icon: data.icon,
//         timer: 3000,
//         button: false
//     })
// }