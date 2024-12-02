import axios from 'axios';
axios.defaults.withCredentials = true

const tatu= 'http://localhost:4000' // 'http://localhost:4000'https://backed-tatto-2.onrender.co' 

export async function onUpdate(updateData) {
    try {
      const response = await axios.put(
        `${tatu}/user/${updateData.id}`,
        updateData.user,
        {
          headers: {
            'Authorization': `Bearer ${updateData.token}`,
            'Content-Type': 'application/json'
          }
        }
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
        `${tatu}/users`
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

export async function onDelete(data){
    return await axios.delete(
        `${tatu}/user/${data.id}`,
        {
            headers: {
              'Authorization': `Bearer ${data.token}`,
              'Content-Type': 'application/json'
            }
          }
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
        `${tatu}/reaction`,
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