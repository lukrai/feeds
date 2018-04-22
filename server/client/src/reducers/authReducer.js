import { FETCH_USER } from '../actions/types';
import {
  VALIDATE_USER_USERNAME,
  VALIDATE_USER_USERNAME_SUCCESS,
  VALIDATE_USER_USERNAME_FAILURE,
  RESET_VALIDATE_USER_USERNAME,
  UPDATE_USER_USERNAME,
  UPDATE_USER_USERNAME_SUCCESS,
  UPDATE_USER_USERNAME_FAILURE,
  RESET_UPDATE_USER_USERNAME,

} from '../actions/users';

export default function(state = null, action) {
  let error;
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case UPDATE_USER_USERNAME:
      return { ...state, error: null, loading: true };
    case UPDATE_USER_USERNAME_SUCCESS:
      return  { ...action.payload, error: null, loading: false };
    case UPDATE_USER_USERNAME_FAILURE:
      error = action.payload || { message: action.payload.message };
      return { ...state, error: error, loading: false };
    case RESET_UPDATE_USER_USERNAME:
      return { ...state, error: null, loading: false };

    case VALIDATE_USER_USERNAME:
      return { ...state, error: null, loading: true }
    case VALIDATE_USER_USERNAME_SUCCESS:
      return { ...state, error: null, loading: false }
    case VALIDATE_USER_USERNAME_FAILURE:
      let result = action.payload;
      if (!result) {
        error = { message: action.payload.message };
      } else { 
        error = result; 
        return { ...state, error: error, loading: false }
      }
    case RESET_UPDATE_USER_USERNAME:
      return { ...state, error: null, loading: null } 
    default:
      return state;
  }
}