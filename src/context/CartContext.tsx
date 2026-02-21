import { createContext, useState } from "react";

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
}

interface CartProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
}

interface ChildrenProps {
  children: React.ReactNode;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: ChildrenProps) {
  const [cart, setCart] = useState<CartProps[]>([]);

  return (
    <CartContext.Provider value={{ cart, cartAmount: cart.length }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
