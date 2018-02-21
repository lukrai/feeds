import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import feedsReducer from './feedsReducer';
import commentsReducer from './commentReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  feeds: feedsReducer,
  comments: commentsReducer

});
