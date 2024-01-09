import axios from 'axios';
axios.defaults.withCredentials = true

//http://localhost:4000


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

export async function onFollow(data) {
    return await axios.post(
        'http://localhost:4000/followUser',
         data
    );
}
export async function onUnFollow(data) {
    return await axios.post(
        'http://localhost:4000/unFollowUser',
         data
    );
}



export async function getFollower(id){
    return await axios.get(
        `http://localhost:4000/follower/${id}`
    );
}
export async function getFollowed(id){
    return await axios.get(
        `http://localhost:4000/followed/${id}`
    );
}

export async function getStatusFollow(data){
    return await axios.post(
        `http://localhost:4000/checkfollowing`,
        data
    );
}

export async function onReaction(data){
    return await axios.post(
        `http://localhost:4000/reactions`,
        data
    );
}

export async function getStatusReactions(data){
    return await axios.post(
        `http://localhost:4000/checkreactions`,
        data
    );
}

export async function unReaction(data){
    return await axios.post(
        `http://localhost:4000/unreaction`,
        data
    );
}

export async function getReactions(post_id){
    return await axios.get(
        `http://localhost:4000/getreactions/${post_id}`
    );
}


export async function updatelocation(data){
    return await axios.post(
        `http://localhost:4000/updatelocation`,
        data
    );
}

