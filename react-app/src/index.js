import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import configureStore from "./store/index";
import * as sessionActions from "./store/auth";
import * as postActions from "./store/posts";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  // restoreCSRF();

  window.store = store;
  window.postActions = postActions;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
