
import axios from 'axios';
axios.defaults.withCredentials = true
export async function onRegistration(registrationData){
    return await axios.post(
        'https://tatto-backend.onrender.com/register',
        registrationData
    );
}

export async function onLogin(loginData){
    return await axios.post(
        'https://tatto-backend.onrender.com/login',
        loginData
    );
}

export async function onLogout(){
    return await axios.get(
        'https://tatto-backend.onrender.com/logout'
    );
}

export async function fechProtectedInfo(){
    return await axios.get(
        'https://tatto-backend.onrender.com/protected'
    );
}
export async function getUsers(){
    return await axios.get(
        'https://tatto-backend.onrender.com/user'
    );
}
export async function getUser(id){
    return await axios.get(
        'https://tatto-backend.onrender.com/user/{id}'
    );
}