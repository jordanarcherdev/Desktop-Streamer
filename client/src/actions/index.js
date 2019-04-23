//@@ Action Creators @@
//@@ signIn       Type: 'SIGN_IN'
//@@ registerUser Type: 'REGISTER_USER'

import streams from '../apis/streams';
import history from '../history';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {
  REGISTER_USER,
  SET_CURRENT_USER,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from './types';


export const registerUser = (formValues) => {
  return async (dispatch) => {
    const response = await streams.post('/api/users/register', { ...formValues });

    dispatch({
      type: REGISTER_USER,
      payload: response.data
    });
    history.push('/');
  }
}

export const loginUser = (formValues) => {
  return async (dispatch) => {
    const response = await streams.post('/api/users/login', { ...formValues });
    const { token } = response.data;
    //Set token to local storage
    localStorage.setItem('jwtToken', token);
    //Set token to auth header
    setAuthToken(token);
    //Decode token to get user data
    const decoded = jwt_decode(token);
    //Set the current user
    dispatch(setCurrentUser(decoded));
    history.push('/')
  }
}

//Setting the logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Get the current logged in user
export const getCurrentUser = () => {
  return async (dispatch, getState) => {
    const id = getState().auth.user;
    console.log(id);
  }
}

//Log user out
export const logoutUser = () => {
  return (dispatch) => {

    localStorage.removeItem('jwtToken');
    //Remove auth header for future requests
    setAuthToken(false);
    //Set current user to null
    dispatch(setCurrentUser({}));
    history.push('/')
  }
}

export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const id = getState().auth.user.id;
    const response = await streams.post('/api/streams/add', { ...formValues, id });

    dispatch({
      type: CREATE_STREAM,
      payload: response.data
    });
    history.push('/');

  }
};

export const fetchStreams = () => {
  return async (dispatch) => {
    const response = await streams.get('/api/streams/');

    dispatch({
      type: FETCH_STREAMS,
      payload: response.data
    });
  }
}

export const fetchStream = (id) => {
  return async (dispatch) => {
    const response = await streams.get(`/api/streams/show/${id}`);

    dispatch({
      type: FETCH_STREAM,
      payload: response.data
    });
  }
}

export const deleteStream = (id) => {
  return async (dispatch) => {
    await streams.delete(`/api/streams/delete/${id}`)

    dispatch({
      type: DELETE_STREAM,
      payload: id
    });
    history.push('/');
  }
}

export const editStream = (id, formValues) => {
  return async (dispatch) => {

    const response = await streams.patch(`/api/streams/edit/${id}`, formValues);

    dispatch({
      type: EDIT_STREAM,
      payload: response.data
    });
    history.push('/');
  }
}
