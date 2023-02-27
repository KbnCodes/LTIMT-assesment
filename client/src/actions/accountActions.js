import authService from 'src/services/authService';
import axios from 'axios';
export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const REGISTER = '@account/register';
export const UPDATE_PROFILE = '@account/update-profile';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export function login(email, password) {
  return async dispatch => {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const user = await authService.loginWithEmailAndPassword(email, password);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user
        }
      });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
      throw error;
    }
  };
}

export function setUserData(user) {
  return dispatch =>
    dispatch({
      type: SILENT_LOGIN,
      payload: {
        user
      }
    });
}

export function logout() {
  return async dispatch => {
    authService.logout();

    dispatch({
      type: LOGOUT
    });
  };
}

export function register(email, password, username) {
  return async dispatch => {
    try {
      const res = await axios.post(
        'http://localhost:5000/register',
        email,
        password,
        username
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data
      });
    }
  };
}
