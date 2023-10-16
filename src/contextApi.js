import React, { useState, createContext } from "react";
import { useCookies } from "react-cookie";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const [userdetails, setuserdetails] = useState([]);
  return (
    <CartContext.Provider
      value={{ cookies, setCookie, userdetails, setuserdetails }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
