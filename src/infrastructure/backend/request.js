/** This Page handles all the api requests, so they can easily be called else where */

const login = async (userName, password) => {
  try {
    const response = await fetch('http://10.0.2.2:8000/v1/users/login/local', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });
    const data = await response.json();
    if (data) {
      //console.log("in the login request handler", data);
      const  user  = data.userName;
      return user;
    } else {
      
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

const googleLogin = () => {};
/**
 *Gets the users online status
 *
 */
const getStatus = () => {};

const logOut = async () => {
  try {
    const response = fetch(`http://localhost:8000/v1/users/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

const getConversations = async (userNameValue) => {
  try {
    const response = await fetch('http://10.0.2.2:8000/v1/conversations/getUserConversations', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userNameValue
      }),
    });

    const data = await response.json();
    if (data) {
     
      return data.conversationList;
    } else {

      return null;
    }

  } catch (err) {
    console.log(err);
  }
};

const getMessages = async (conversationId) => {
  try {
    const response = await fetch('http://10.0.2.2:8000/v1/conversations/getMessageLog', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversationId: conversationId
      }),
    });

    const data = await response.json();
    if (data) {

      return data.messageList;
    } else {

      return null;
    }

  } catch (err) {
    console.log(err);
  }
};

const register = async (userName, password, firstName, lastName, email) => { 
  try {
    const response = await fetch('http://10.0.2.2:8000/v1/users/register/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });

    return response.status === 400 && response.json().message === "Username/Email not available"
    ? { error: "Username/Email not available" }
    : response.status === 200
      ? (async () => {
          const data = await response.json();
          const user = data.userName;
          return user;
        })()
      : null;
      
  } catch (err) {
    console.log(err);
  }
};
  

module.exports = {
  login,
  googleLogin,
  getStatus,
  logOut,
  getConversations,
  getMessages,
  register,
};
