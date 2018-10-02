import { GET_NOTES, GET_NOTE, UPDATE_NOTE, ADD_NOTE } from './types';

import axios from 'axios';

const config = {
  mode: 'no-cors',
  auth: {
    username: 'admin',
    password: '1234'
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
};

export const getNotes = () => async dispatch => {
  const res = await axios.get('http://localhost:8080/notes', config);
  dispatch({
    type: GET_NOTES,
    payload: res.data.data
  });
};

export const getNote = id => async dispatch => {
  const res = await axios.get(`http://localhost:8080/notes/${id}`, config);
  const data = res.data.data;
  const note = {
    id: data.id,
    title: data.title,
    note: JSON.parse(res.data.data.note)
  };
  dispatch({
    type: GET_NOTE,
    payload: note
  });
};

export const updateNote = note => async dispatch => {
  const res = await axios.put(
    `http://localhost:8080/notes/${note.id}`,
    note,
    config
  );
  dispatch({
    type: UPDATE_NOTE,
    payload: res.data.data
  });
};

export const addNote = note => async dispatch => {
  const res = await axios.post('http://localhost:8080/notes/', note, config);
  const data = res.data.data;
  const newNote = {
    id: data.id,
    title: data.title,
    note: JSON.parse(res.data.data.note)
  };
  dispatch({
    type: ADD_NOTE,
    payload: newNote
  });
};
