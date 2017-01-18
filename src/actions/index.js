import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CLEAR_ALERT,
  LOGIN_USER
} from './types';

export const emailChanged = (text) => {
  const action = {};
  action.type = EMAIL_CHANGED;
  action.payload = text;
  console.log(EMAIL_CHANGED);
  console.log(action);
  return action;
};
export const passwordChanged = (text) => {
  const action = {};
  action.type = PASSWORD_CHANGED;
  action.payload = text;
  console.log(PASSWORD_CHANGED);
  console.log(action);
  return action;
};
export const clearAlert = () => {
  const action = {};
  action.type = CLEAR_ALERT;
  action.payload = null;
  console.log(CLEAR_ALERT);
  console.log(action);
  return action;
};
export const loginUser = ({ email, password }) =>
  (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => userLoginSuccess(dispatch, user))
      .catch((error) => userLoginFail(dispatch, error));
  };
  const userLoginFail = (dispatch, error) => {
    const action = {};
    action.type = LOGIN_USER_FAIL;
    action.payload = error;
    console.log(LOGIN_USER_FAIL);
    console.log(action);
    dispatch(action);
  };
  const userLoginSuccess = (dispatch, user) => {
    const action = {};
    action.type = LOGIN_USER_SUCCESS;
    action.payload = user;
    console.log(LOGIN_USER_SUCCESS);
    console.log(action);
    dispatch(action);
    Actions.employeelist();
  };
