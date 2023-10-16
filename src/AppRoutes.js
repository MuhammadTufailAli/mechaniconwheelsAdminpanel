import React, { useState, createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
//UserProfiling
import SignUp from "./Screens/UserProfiling/SignUp";
import Login from "./Screens/UserProfiling/login";
//Dashboard
import Dashboard from "./Screens/Dashboard/Dashboard";
//Users
import AllUsers from "./Screens/Users/AllUsers";
import SelectedUserDetails from "./Screens/Users/SelectedUserDetails";
//Products
import AllProducts from "./Screens/Product/AllProducts";
import SelectedProductDetails from "./Screens/Product/SelectedProductDetails";
//Vehicle
import AllVehicle from "./Screens/Vehicle/AllVehicle";
import SelectedVehicleDetails from "./Screens/Vehicle/SelectedVehicle";
//Notification
import NotificationScreen from "./Screens/Notification/NotificationScreen";
//Messenger
import Messenger from "./Screens/Messenger/Messenger";

import CartProvider from "./contextApi";

function AppRoutes() {
  const { cookies, setCookie } = useContext(CartProvider);
  return (
    <div>
      <Routes>
        {/* User Profiling */}
        <Route
          path="/"
          element={
            Object.keys(cookies).length === 0 ? <Login /> : <Dashboard />
          }
        />
        <Route path="/SignUp" element={<SignUp />} />
        {/* User */}
        <Route path="/AllUsers" element={<AllUsers />} />
        <Route
          path="/AllUsers/SelectedUserDetails"
          element={<SelectedUserDetails />}
        />
        {/* Product */}
        <Route path="/AllProducts" element={<AllProducts />} />
        <Route
          path="/AllProducts/SelectedProductDetails"
          element={<SelectedProductDetails />}
        />
        {/* Vehicle */}
        <Route path="/AllVehicle" element={<AllVehicle />} />
        <Route
          path="/AllVehicle/SelectedVehicleDetails"
          element={<SelectedVehicleDetails />}
        />

        {/* Notification */}
        <Route path="/Notification" element={<NotificationScreen />} />
        {/* Messenger */}
        <Route path="/Messenger" element={<Messenger />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
