
import axios from 'axios';
axios.defaults.withCredentials = true

export async function onUpdate(updateData) {
    console.log(updateData.user)
    try {
      const response = await axios.put(
        `https://tattopro.vercel.app/user/${updateData.id}`,
        updateData.user
      );
  
      return response.data;
    } catch (error) {
      throw error;
    }
  }
export async function onRegistration(registrationData){
    return await axios.post(
        'https://tattopro.vercel.app/register',
        registrationData
    );
}

export async function onLogin(loginData){
    return await axios.post(
        'https://tattopro.vercel.app/login',
        loginData
    );
}

export async function onLogout(){
    return await axios.get(
        'https://tattopro.vercel.app/logout'
    );
}

export async function fechProtectedInfo(){
    return await axios.get(
        'https://tattopro.vercel.app/protected'
    );
}
export async function getUsers(){
    return await axios.get(
        'https://tattopro.vercel.app/user'
    );
}
export async function getUser(id){
    return await axios.get(
        `https://tattopro.vercel.app/user/${id}`
    );
}

export async function onDelete(id){
    return await axios.delete(
        `https://tattopro.vercel.app/user/${id}`
    );
}