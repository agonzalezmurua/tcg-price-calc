"use client";

import React, { createContext, useRef } from "react";
import { CartStore } from "../store/CartStore";
// @ts-expect-error
export const CartContext = createContext<CartStore>();

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = useRef(new CartStore());

  return (
    <CartContext.Provider value={cart.current}>{children}</CartContext.Provider>
  );
}
