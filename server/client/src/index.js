import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

import App from './components/App';
import reducers from './reducers';


const middleware = [ reduxThunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducers, 
  {}, 
  applyMiddleware(...middleware)
);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);

// import 'materialize-css/dist/css/materialize.min.css';
/* <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link> */