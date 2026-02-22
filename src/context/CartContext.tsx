import { createContext, useState } from "react";
import type { ProdutosProps } from "../pages/Home";

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProdutosProps) => void;
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
  function addItemCart(newItem: ProdutosProps) {
    const indexItem = cart.findIndex((item) => item.id === newItem.id);

    if (indexItem !== -1) {
      // item já existe => incrementa
      const cartList = [...cart]; // copia o array para não alterar o estado direto
      cartList[indexItem].amount += 1;
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price;
      setCart(cartList);
      return;
    }

    // item não existe → adiciona novo
    const data: CartProps = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };
    setCart((prev) => [...prev, data]);
  }

  return (
    <CartContext.Provider
      value={{ cart, cartAmount: cart.length, addItemCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
