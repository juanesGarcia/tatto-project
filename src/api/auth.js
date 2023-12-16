
import axios from 'axios';
axios.defaults.withCredentials = true

export async function onUpdate(updateData) {
    console.log(updateData.user)
    try {
      const response = await axios.put(
        `https://tattopro.com/user/${updateData.id}`,
        updateData.user
      );
  
      return response.data;
    } catch (error) {
      throw error;
    }
  }
export async function onRegistration(registrationData){
    return await axios.post(
        'https://tattopro.com/register',
        registrationData
    );
}

export async function onLogin(loginData){
    return await axios.post(
        'https://tattopro.com/login',
        loginData
    );
}

export async function onLogout(){
    return await axios.get(
        'https://tattopro.com/logout'
    );
}

export async function fechProtectedInfo(){
    return await axios.get(
        'https://tattopro.com/protected'
    );
}
export async function getUsers(){
    return await axios.get(
        'https://tattopro.com/user'
    );
}
export async function getUser(id){
    return await axios.get(
        `https://tattopro.com/user/${id}`
    );
}

export async function onDelete(id){
    return await axios.delete(
        `https://tattopro.com/user/${id}`
    );
}