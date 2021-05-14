import React from "react";
import ReactDOM from "react-dom";
import axios, { AxiosError } from "axios";

import "bootstrap/dist/css/bootstrap-grid.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let errMsg: string[] = [];
    const { response } = error;
    if (
      response &&
      response.data &&
      typeof response.data === "object" &&
      // eslint-disable-next-line valid-typeof
      typeof response.data !== null
    ) {
      const { data } = response;
      if ("detail" in data) {
        errMsg.push(data.detail);
      } else {
        Object.keys(response.data).forEach((key) => {
          if (typeof data[key] === "string") {
            errMsg.push(`{${key}}: ${response.data[key]}`);
          }
          if (Array.isArray(data[key])) {
            errMsg.push(`{${key}}: ${response.data[key].join(" | ")}`);
          }
        });
      }
    } else {
      errMsg = [error.message];
    }
    return Promise.reject(errMsg);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
