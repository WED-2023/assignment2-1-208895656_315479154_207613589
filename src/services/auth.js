// src/services/auth.js
import axios from 'axios';
import { store } from '../store';

axios.defaults.withCredentials = true;



export async function Login(current_username, current_password) {
  try {
    console.log("username: ", current_username);
    console.log("password: ", current_password);
    const response = await axios.post('https://daniftgalkitchen.cs.bgu.ac.il/auth/login', {
      username: current_username,
      password: current_password
    });
    // seeting the user_id in the session_storage
    if (response.data.success) {
      sessionStorage.setItem('user_id', response.data.user_id);
      sessionStorage.setItem('username', current_username)
    }
    // Clear session storage on login to remove stale data
    // this.$root.store.username = current_username
    sessionStorage.removeItem('lastSearch');
    console.log()
    store.set_user_id(response.data.user_id)
    store.set_username(current_username)
    console.log("inside login session:", store.user_id)
    return { response };
  } catch (error) {
    console.error('Error login', error);
    throw error;
  }
}

export async function register(userDetails) {
  try {
    console.log("starting register", userDetails);
    console.log(userDetails.firstName);
    //https://daniftgalkitchen.cs.bgu.ac.il/
    const response = await axios.post('https://daniftgalkitchen.cs.bgu.ac.il/auth/Register', {
      username: userDetails.username,
      password: userDetails.password,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      country: userDetails.country
    });
    console.log(response);
    return { response };
  } catch (error) {
    console.error('Error register', error);
    throw error;
  }
}

export async function Logout() {
  try {
    const response = await axios.post('https://daniftgalkitchen.cs.bgu.ac.il/auth/Logout', {});
    // Clear session storage on logout
    sessionStorage.removeItem('lastSearch');
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('username')
    store.reset()
    console.log(store.user_id)
    return { response };
  } catch (error) {
    console.error('Error logout', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const response = await axios.get('https://daniftgalkitchen.cs.bgu.ac.il/auth/current_user');
    return response.data;
  } catch (error) {
    console.error('Error getting current user', error);
    throw error;
  }
}
