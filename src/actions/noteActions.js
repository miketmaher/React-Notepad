import { GET_NOTES } from './types';
import axios from axios;

const auth = {
  username: 'admin',
  password: '1234'
}

export const getNotes = () => async dispatch => {
  const res = await axios.get('http://localhost:8080/notes',{
    auth: auth
  });
  dispatch({
    type: GET_NOTES,
    payload: res.data.data
  });
}