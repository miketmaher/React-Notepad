import {
  GET_NOTES,
  DELETE_NOTE,
  ADD_NOTE,
  GET_NOTE,
  UPDATE_NOTE
} from './types';

import axios from 'axios';

const auth = {
  username: 'admin',
  password: '1234'
};

export const getNotes = () => async dispatch => {
  const res = await axios.get('http://localhost:8080/notes', {
    auth: auth
  });
  dispatch({
    type: GET_NOTES,
    payload: res.data.data
  });
};

export const getNote = id => async dispatch => {
  const res = await axios.get(`http://localhost:8080/notes${id}`);
  dispatch({
    type: GET_NOTE,
    payload: res.data.data
  });
};

// export const deleteNote = id => dispatch => {
//   await axios.delete(/*TODO URL*/);
//   dispatch ({
//     type: DELETE_NOTE,
//     payload: id
//   });
// }

export const addNote = note => async dispatch => {
  const res = await axios.get(`http://localhost:8080/notes/5`, {
    auth: auth
  });
  dispatch({
    type: ADD_NOTE,
    payload: note
  });
  console.log(res.data.data);
};

export const updateNote = note => async dispatch => {
  const res = await axios.put(/*TODO: URL*/ note);
  dispatch({
    type: UPDATE_NOTE,
    payload: res.data
  });
};
