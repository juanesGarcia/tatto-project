
import axios from 'axios';
axios.defaults.withCredentials = true

export async function onUpdate(updateData) {
    console.log(updateData.user)
    try {
      const response = await axios.put(
        `http://localhost:4000/user/${updateData.id}`,
        updateData.user
      );
  
      return response.data;
    } catch (error) {
      throw error;
    }
  }
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
        `http://localhost:4000/user/${id}`
    );
}

export async function onDelete(id){
    return await axios.delete(
        `http://localhost:4000/user/${id}`
    );
}