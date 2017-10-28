import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import feedsReducer from './feedsReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  feeds: feedsReducer

});
