import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { CartProvider } from "./contextApi";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
        {/* <Routes>
          <Route path="/" element={<App />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="AllUsers" element={<AllUsers />} />
          <Route path="Notification" element={<NotificationScreen />} />
          <Route
            path="AllUsers/SelectedUserDetails"
            element={<SelectedUserDetails />}
          />
          <Route path="AllProducts" element={<AllProducts />} />
          <Route
            path="AllProducts/SelectedProductDetails"
            element={<SelectedProductDetails />}
          />
          <Route path="Messenger" element={<Messenger />} />
        </Routes> */}
      </BrowserRouter>
    </CartProvider>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
