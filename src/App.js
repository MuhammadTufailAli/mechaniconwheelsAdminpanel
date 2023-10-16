import React, { useState, createContext, useContext } from "react";
import { useCookies } from "react-cookie";

import CartProvider from "./contextApi";

import AppRoutes from "./AppRoutes";

// const cookie = createContext();
function App() {
  const { cookies, setCookie } = useContext(CartProvider);

  return (
    <div>
      <AppRoutes />
    </div>
  );
  // if (Object.keys(cookies).length === 0) {
  //   return (
  //     <div>
  //       <Login />
  //     </div>
  //   );
  // } else {
  //   console.log('I am in dashboard now');
  //   return (
  //     <div>
  //       <Dashboard />
  //     </div>
  //   );
  // }
}

export default App;
