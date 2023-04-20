/** This Page handles all the api requests, so they can easily be called else where */

/*******************************************
 * CREATE***********
 ******************************************/

/**
 * Calls the API to register a new user
 *
 * @param {*} userName
 * @param {*} password
 * @param {*} firstName
 * @param {*} lastName
 * @param {*} email
 * @return {*}
 */
const register = async (userName, password, firstName, lastName, email) => {
  try {
    const response = await fetch('https://send1t-api.onrender.com/v1/users/register/', {
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

    const data = await response.json();
    console.log('in register request handler', data);
    if (data) {
      //console.log("in the login request handler", data);
      if (data.message === 'Username/Email not available') {
        throw new Error('Username/Email not available');
      } else {
        const user = data.userName;
        return user;
      }
    } else {
      throw new Error('registration failed');
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * This is used to create a new conversation
 * This is called when a user clicks on a friend to start a conversation from the friends screen
 *
 *
 * @param {*} participants - the array of users that are in the conversation
 * @param {*} isGroup - boolean value that determines if the conversation is a group or not This means that the
 * conversation is between more then two users
 * @return {*}
 */
const makeNewConversation = async (participants, isGroup) => {
  try {
    const response = await fetch(
      'https://send1t-api.onrender.com/v1/conversations/createConversation',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participants: participants,
          isGroup: isGroup,
        }),
      }
    );

    const data = await response.json();
    if (data) {
      console.log(data);
      return data;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

//needs testing
const sendFriendRequest = async (userName, friendName) => {
  try {
    const response = await fetch(
      'http://localhost:8000/v1/users/sendFriendRequest',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
          friendName: friendName,
        }),
      }
    );
    const data = await response.json();
    if (data) {
      //console.log("in the login request handler", data);
      const user = data.userName;
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

/*******************************************
 * READ***********
 ******************************************/

/**
 * calls the API to Login the user
 *
 * @param {*} userName
 * @param {*} password
 * @return {*}
 */
const login = async (userName, password) => {
  try {
    const response = await fetch(
      'https://send1t-api.onrender.com/v1/users/login/local',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
      }
    );
    const data = await response.json();
    if (data) {

      return data;
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

const seachForUser = async (userName) => {
  try {
    const response = await fetch(
      'http://10.0.2.2:8000/v1/users/searchForUser',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
        }),
      }
    );

    const foundUser = await response.json();
    if (foundUser === { message: 'User not found' }) {
      return { message: 'User not found' };
    } else {
      return foundUser;
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * Gets the users conversations
 * This information is displayed on the main conversation screen
 *
 * @param {*} userNameValue - the username of the current signed in user
 * @return {*}
 */
const getConversations = async (userNameValue) => {
  try {
    const response = await fetch(
      'https://send1t-api.onrender.com/v1/conversations/getUserConversations',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userNameValue,
        }),
      }
    );

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

/**
 * Returns the friend requests of the user
 * @returns
 */
const getFriendRequests = async () => {
  try {
    const response = await fetch(
      'http://10.0.2.2:8000/v1/users/getFriendRequests',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const friendRequests = await response.json();
    if (friendRequests.length !== 0) {
      return friendRequests;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 *This is used to get the messages for a specific conversation
 * called when a user clicks on a conversation
 * The messages are then updated using websockets
 * @param {*} conversationId - the conversation id of the conversation the messages belong to
 * @return {*}
 */
const getMessages = async (conversationId) => {
  try {
    const response = await fetch(
      'https://send1t-api.onrender.com/v1/conversations/getMessageLog',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId: conversationId,
        }),
      }
    );

    const data = await response.json();
    if (data) {
      if (data.messages.docs.length > 0) {
        return data.messages.docs;
      } else {
        return null;
      }
    } else {
      throw new Error('failed to get messages');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Calls the API to get the friends of a user
 *
 *
 * @return {*} - an array of friends
 */
const getFriends = async () => {
  try {
    const response = await fetch('https://send1t-api.onrender.com/v1/users/contacts', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const contacts = await response.json();
    if (contacts) {
      //console.log("in the login request handler", data);

      return contacts;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

/*******************************************
 * UPDATE***********
 ******************************************/

//needs testing
const acceptFriendRequest = async (userName, friendName) => {
  try {
    const response = await fetch(
      'http://10.0.2.2:8000/v1/users/acceptFriendRequest',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
          friendName: friendName,
        }),
      }
    );
    const data = await response.json();
    if (data) {
      const user = data.userName;
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

//needs testing
const declineFriendRequest = async (userName, friendName) => {
  try {
    const response = await fetch(
      'http://10.0.2.2:8000/v1/users/declineFriendRequest',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
          friendName: friendName,
        }),
      }
    );

    return response.status === 400 &&
      response.json().message === 'Username/Email not available'
      ? { error: 'Username/Email not available' }
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

/**
 *Updates the users Online status
 *
 * @param {*} status - the status to be updated to
 * @return {*} - the updated user
 */
const updateStatus = async (status) => {
  try {
    const response = await fetch(
      'http://10.0.2.2:8000/v1/users/changeUserStatus',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: status,
        }),
      }
    );
    const data = await response.json();
    if (data) {
      const user = data;
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (firstName, lastName, email, tagLine) => {
  try {
    const response = await fetch('http://10.0.2.2:8000/v1/users/updateUser', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        tagLine: tagLine,
      }),
    });
    const data = await response.json();
    if (data) {
      const user = data;
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

/*******************************************
 * DELETE***********
 ******************************************/

/**
 * Calls the API to logout the user
 *
 * @return {*}
 */
const logOut = async () => {
  try {
    const response = await fetch(`https://send1t-api.onrender.com/v1/users/logout`, {
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

module.exports = {
  login,
  googleLogin,
  getStatus,
  logOut,
  getConversations,
  getMessages,
  register,
  getFriends,
  makeNewConversation,
  updateUser,
  getFriendRequests,
  seachForUser,
};
