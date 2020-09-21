import axios from 'axios';
import {LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER} from '../constants';

export function registerUser(name, email, password, image) {
  const request = axios
    .post('/api/users/register', {name, email, password, image})
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(email, password) {
  const request = axios
    .post('/api/users/login', {email, password})
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get('/api/users/auth')
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get('/api/users/logout')
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
