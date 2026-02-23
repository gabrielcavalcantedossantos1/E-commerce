import { createContext, useState } from "react";
import type { ProdutosProps } from "../pages/Home";

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProdutosProps) => void;
  removeItemCart: (produto: CartProps) => void;
  total: string;
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
  const [totalCart, setTotalCart] = useState("R$ 0,00"); // inicializar com valor padrão

  // Corrige: atualiza o estado totalCart
  function totalResultCart(items: CartProps[]) {
    const result = items.reduce((acc, item) => acc + item.total, 0);
    const formattedResult = result.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setTotalCart(formattedResult); // ✅ atualiza estado
  }

  function addItemCart(newItem: ProdutosProps) {
    const indexItem = cart.findIndex((item) => item.id === newItem.id);

    if (indexItem !== -1) {
      const cartList = [...cart];
      cartList[indexItem].amount += 1;
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price;
      setCart(cartList);
      totalResultCart(cartList); // ✅ atualiza total
      return;
    }

    const data: CartProps = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };

    setCart((prev) => {
      const newCart = [...prev, data];
      totalResultCart(newCart); // ✅ atualiza total
      return newCart;
    });
  }

  function removeItemCart(produto: CartProps) {
    const indexItem = cart.findIndex((item) => item.id === produto.id);
    if (indexItem === -1) return;

    const cartList = [...cart];

    if (cartList[indexItem].amount > 1) {
      cartList[indexItem].amount -= 1;
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price;
      setCart(cartList);
      totalResultCart(cartList); // ✅ atualiza total
      return;
    }

    const removeItem = cartList.filter((item) => item.id !== produto.id);
    setCart(removeItem);
    totalResultCart(removeItem); // ✅ atualiza total
  }

  const cartAmount = cart.reduce((acc, item) => acc + item.amount, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount,
        addItemCart,
        removeItemCart,
        total: totalCart, // ✅ passar o estado correto
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;