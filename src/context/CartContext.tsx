import { createContext, useState } from "react";
import type { ProdutosProps } from "../pages/Home";

interface CartContextData {
  cart: CartProps[];
  cartAmount: number; // quantidade de produtos diferentes
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
  const [totalCart, setTotalCart] = useState("R$ 0,00"); // inicializa total

  // Atualiza o total do carrinho
  function totalResultCart(items: CartProps[]) {
    const result = items.reduce((acc, item) => acc + item.total, 0);
    const formattedResult = result.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setTotalCart(formattedResult);
  }

  // Adiciona item ao carrinho
  function addItemCart(newItem: ProdutosProps) {
    const indexItem = cart.findIndex((item) => item.id === newItem.id);

    if (indexItem !== -1) {
      // se já existe, só aumenta a quantidade
      const cartList = [...cart];
      cartList[indexItem].amount += 1;
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price;
      setCart(cartList);
      totalResultCart(cartList);
      return;
    }

    // se não existe, adiciona novo produto
    const data: CartProps = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };

    setCart((prev) => {
      const newCart = [...prev, data];
      totalResultCart(newCart);
      return newCart;
    });
  }

  // Remove item do carrinho
  function removeItemCart(produto: CartProps) {
    const indexItem = cart.findIndex((item) => item.id === produto.id);
    if (indexItem === -1) return;

    const cartList = [...cart];

    if (cartList[indexItem].amount > 1) {
      // diminui quantidade
      cartList[indexItem].amount -= 1;
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price;
      setCart(cartList);
      totalResultCart(cartList);
      return;
    }

    // remove item se amount = 1
    const newCart = cartList.filter((item) => item.id !== produto.id);
    setCart(newCart);
    totalResultCart(newCart);
  }

  // Quantidade de produtos diferentes (para a bolinha)
  const cartAmount = cart.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount,
        addItemCart,
        removeItemCart,
        total: totalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;