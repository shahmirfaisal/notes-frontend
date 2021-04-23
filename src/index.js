import React from "react";
import ReactDOM from "react-dom";
import "react-notifications/lib/notifications.css";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/index";
import { Provider } from "react-redux";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
