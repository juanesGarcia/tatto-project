import axios from 'axios';
axios.defaults.withCredentials = true

const tatu= 'https://tatto-backend.onrender.com'//'http://localhost:4000'


export async function onUpdate(updateData) {
    console.log(updateData.user)
    try {
      const response = await axios.put(
        `${tatu}/user/${updateData.id}`,
        updateData.user
      );
  
      return response.data;
    } catch (error) {
      throw error;
    }
  }
export async function onRegistration(registrationData){
    return await axios.post(
        `${tatu}/register `,
        registrationData
    );
}

export async function onLogin(loginData){
    return await axios.post(
        `${tatu}/login `,
        loginData
    );
}

export async function onLogout(){
    return await axios.get(
        `${tatu}/logout`
    );
}

export async function fechProtectedInfo(){
    return await axios.get(
        `${tatu}/protected`
    );
}
export async function getUsers(){
    return await axios.get(
        `${tatu}/user`
    );
}
export async function getUsersWithRating(){
    return await axios.get(
        `${tatu}/userwithrating`
    );
}
export async function getUser(id){
    return await axios.get(
        `${tatu}/user/${id}`
    );
}
export async function getUserInfo(id){
    return await axios.get(
        `${tatu}/userInfo/${id}`
    );
}

export async function onDelete(id){
    return await axios.delete(
        `${tatu}/user/${id}`
    );
}

export async function onFollow(data) {
    return await axios.post(
        `${tatu}/followUser`,
         data
    );
}
export async function onUnFollow(data) {
    return await axios.post(
        `${tatu}/unFollowUser`,
         data
    );
}



export async function getFollower(id){
    return await axios.get(
        `${tatu}/follower/${id}`
    );
}
export async function getFollowed(id){
    return await axios.get(
        `${tatu}/followed/${id}`
    );
}

export async function getStatusFollow(data){
    return await axios.post(
        `${tatu}/checkfollowing`,
        data
    );
}

export async function onReaction(data){
    return await axios.post(
        `${tatu}/reactions`,
        data
    );
}

export async function getStatusReactions(data){
    return await axios.post(
        `${tatu}/checkreactions`,
        data
    );
}

export async function unReaction(data){
    return await axios.post(
        `${tatu}/unreaction`,
        data
    );
}

export async function getReactions(post_id){
    return await axios.get(
        `${tatu}/getreactions/${post_id}`
    );
}


export async function updatelocation(data){
    return await axios.post(
        `${tatu}/updatelocation`,
        data
    );
}

export async function rating2(data){
    return await axios.post(
        `${tatu}/rating`,
        data
    );
}

export async function getRatingp(id){
    return await axios.get(
        `${tatu}/getRating/${id}`
    );
}

export async function yetRating(data){
    return await axios.post(
        `${tatu}/yetrating`,
        data
    );
}