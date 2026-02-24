import { BsCartPlus } from "react-icons/bs";

import { produtos } from "../../data/produtos";

import { useContext, useEffect, useState } from "react";

import { CartContext } from "../../context/CartContext";

export interface ProdutosProps {
  cover: string;
  description: string;
  id: number;
  price: number;
  title: string;
}

export function Home() {
  const { addItemCart } = useContext(CartContext);
  const [products, setProducts] = useState<ProdutosProps[]>([]);

  useEffect(() => {
    async function getProducts() {
      setProducts(produtos);
    }

    getProducts();
  }, []);

  function handleAddToCart(item: ProdutosProps) {
    addItemCart(item);
  }

  return (
    <div>
      <main className="w-full max-w-6xl px-4 mx-auto">
        <h1 className=" font-bold text-2xl mb-4 mt-10 text-center">
          Produtos em alta
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {products &&
            products.map((produto) => (
              <section className="w-full" key={produto.id}>
                <img
                  className="w-full rounded-lg h-48 object-contain bg-white mb-2"
                  src={produto.cover}
                  alt={produto.title}
                />
                <p className="font-medium mt-1 mb-1">{produto.title}</p>
                <div className="flex gap-3 items-center">
                  <strong className="text-zinc-700/90">
                    {produto.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                  <button
                    onClick={() => handleAddToCart(produto)}
                    className="bg-zinc-900 p-1 rounded cursor-pointer"
                  >
                    <BsCartPlus size={20} color="#fff" />
                  </button>
                </div>
              </section>
            ))}
        </div>
      </main>
    </div>
  );
}
