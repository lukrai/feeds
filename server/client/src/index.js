/* eslint-disable linebreak-style */
import "semantic-ui-css/semantic.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { createLogger } from "redux-logger";

import App from "./components/App";
import reducers from "./reducers";


const middleware = [ reduxThunk ];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(
  reducers, 
  {}, 
  applyMiddleware(...middleware)
);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector("#root")
);
