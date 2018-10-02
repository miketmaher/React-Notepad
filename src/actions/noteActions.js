import { GET_NOTES, GET_NOTE, UPDATE_NOTE, ADD_NOTE } from './types';

import axios from 'axios';

const config = {
  auth: {
    username: 'admin',
    password: '1234'
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
  const updatedNote = note;
  updatedNote.note = JSON.stringify(note.note);
  await axios.post(
    `http://localhost:8080/notes/${note.id}`,
    updatedNote,
    config
  );

  dispatch({
    type: UPDATE_NOTE,
    payload: note
  });
};

export const addNote = note => async dispatch => {
  const newNote = note;
  newNote.note = JSON.stringify(note.note);
  const res = await axios.post('http://localhost:8080/notes', newNote, config);
  console.log(res);

  dispatch({
    type: ADD_NOTE,
    payload: newNote
  });
};
