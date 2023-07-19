import React from "react";
import ReactDOM from "react-dom/client";
import "../src/style/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import ContextProviders from "./contexts/ContextProviders";
import { ToastContainer } from "react-toastify";

axios.defaults.baseURL = "http://localhost:8080";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ContextProviders>
      <App />
      <ToastContainer position="top-right" />
    </ContextProviders>
  </BrowserRouter>
);

reportWebVitals();
