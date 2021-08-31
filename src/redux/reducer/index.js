import {combineReducers} from 'redux';
import {GET_USER, DELETE_USER} from '../type';

const USER_STATE = {
  email: '',
  userName: '',
  name: '',
  firstName: '',
  velo: '',
  freins: '',
  air: '',
  roues: '',
};

const userReducer = (state = USER_STATE, action) => {
  switch (action.type) {
    case GET_USER: {
      return action.payload;
    }
    case DELETE_USER: {
      return null;
    }
    default:
      return null;
  }
};

export default combineReducers({
  user: userReducer,
});
