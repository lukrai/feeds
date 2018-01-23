import axios from 'axios';
import { FETCH_USER, FETCH_FEEDS } from './types';
import { push } from 'react-router-redux'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    //console.log("this is fetch User");
    //console.log(res);
    dispatch({ type: FETCH_USER, payload: res.data });

    // return function (dispatch) {
    //     axios.get('/api/current_user')
    //         .then(res => dispatch({ type: FETCH_USER, payload: res }))
    // }; same shit
};

export const submitFeedForm = (values, history) => dispatch => {debugger;
    const res =  axios.post('/api/feed', values.values);debugger;

    //history.push('/redirect-to');debugger;
    //this.context.history.push('/path');
    history.push('/feeds');
    //dispatch({ type: FETCH_FEEDS, payload: res.data });
    //dispatch(push('/home'));
};

// export const fetchFeeds = () => async dispatch => {
//     const res = await axios.get('/api/feed');
  
//     dispatch({ type: FETCH_FEEDS, payload: res.data });
// };

export const fetchFeed = (id) => async dispatch => {
    const res = await axios.get('/api/feed/'+id);
  
    dispatch({ type: FETCH_FEEDS, payload: res.data });
};
