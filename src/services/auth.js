// src/services/auth.js
import axios from 'axios';

export async function Login(current_username, current_password) {
  try {
    console.log("username: ", current_username);
    console.log("password: ", current_password);
    const response = await axios.post('http://localhost:80/auth/login', {
      username: current_username,
      password: current_password
    });
    // Clear session storage on login to remove stale data
    sessionStorage.removeItem('lastSearch');
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
    const response = await axios.post('http://localhost:80/auth/Register', {
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
    const response = await axios.post('http://localhost:80/auth/Logout', {});
    // Clear session storage on logout
    sessionStorage.removeItem('lastSearch');
    return { response };
  } catch (error) {
    console.error('Error logout', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const response = await axios.get('http://localhost:80/auth/current_user');
    return response.data;
  } catch (error) {
    console.error('Error getting current user', error);
    throw error;
  }
}
