import {
  GET_NOTES,
  ADD_NOTE,
  GET_NOTE,
  UPDATE_NOTE,
  SET_NOTE_STATE
} from '../actions/types';

const initialState = {
  notes: [],
  note: {},
  id: '',
  title: '',
  text: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload
      };
    case GET_NOTE:
      return {
        ...state,
        note: action.payload
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes]
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map(
          note =>
            note.id === action.payload.id ? (note = action.payload) : note
        )
      };
    case SET_NOTE_STATE:
      return {
        ...state,
        id: action.payload.id,
        title: action.payload.title,
        text: action.payload.text
      };
    default:
      return state;
  }
}
