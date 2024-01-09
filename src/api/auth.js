import axios from 'axios';
axios.defaults.withCredentials = true

//https://tatto-backend.onrender.com


export async function onUpdate(updateData) {
    console.log(updateData.user)
    try {
      const response = await axios.put(
        `https://tatto-backend.onrender.com/user/${updateData.id}`,
        updateData.user
      );
  
      return response.data;
    } catch (error) {
      throw error;
    }
  }
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
        `https://tatto-backend.onrender.com/user/${id}`
    );
}

export async function onDelete(id){
    return await axios.delete(
        `https://tatto-backend.onrender.com/user/${id}`
    );
}

export async function onFollow(data) {
    return await axios.post(
        'https://tatto-backend.onrender.com/followUser',
         data
    );
}
export async function onUnFollow(data) {
    return await axios.post(
        'https://tatto-backend.onrender.com/unFollowUser',
         data
    );
}



export async function getFollower(id){
    return await axios.get(
        `https://tatto-backend.onrender.com/follower/${id}`
    );
}
export async function getFollowed(id){
    return await axios.get(
        `https://tatto-backend.onrender.com/followed/${id}`
    );
}

export async function getStatusFollow(data){
    return await axios.post(
        `https://tatto-backend.onrender.com/checkfollowing`,
        data
    );
}

export async function onReaction(data){
    return await axios.post(
        `https://tatto-backend.onrender.com/reactions`,
        data
    );
}

export async function getStatusReactions(data){
    return await axios.post(
        `https://tatto-backend.onrender.com/checkreactions`,
        data
    );
}

export async function unReaction(data){
    return await axios.post(
        `https://tatto-backend.onrender.com/unreaction`,
        data
    );
}

export async function getReactions(post_id){
    return await axios.get(
        `https://tatto-backend.onrender.com/getreactions/${post_id}`
    );
}


export async function updatelocation(data){
    return await axios.post(
        `https://tatto-backend.onrender.com/updatelocation`,
        data
    );
}

