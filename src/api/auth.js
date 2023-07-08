
import axios from 'axios';
axios.defaults.withCredentials = true
export async function onRegistration(registrationData){
    return await axios.post(
        'http://localhost:4000/register',
        registrationData
    );
}

export async function onLogin(loginData){
    return await axios.post(
        'http://localhost:4000/login',
        loginData
    );
}

export async function onLogout(){
    return await axios.get(
        'http://localhost:4000/logout'
    );
}

export async function fechProtectedInfo(){
    return await axios.get(
        'http://localhost:4000/protected'
    );
}
export async function getUsers(){
    return await axios.get(
        'http://localhost:4000/user'
    );
}
export async function getUser(id){
    return await axios.get(
        'http://localhost:4000/user/{id}'
    );
}