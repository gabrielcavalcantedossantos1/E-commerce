import { BsCartPlus } from "react-icons/bs";

import { api } from "../../services/api";

import { useEffect, useState } from "react";

interface ProdutosProps {
  cover: string;
  description: string;
  id: string;
  price: number;
  title: string;
}

export function Home() {
  const [products, setProducts] = useState<ProdutosProps[]>([]);

  useEffect(() => {
    async function getProducts() {
      const reponse = await api.get("/produtos");
      setProducts(reponse.data);
    }

    getProducts();
  }, []);

  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto">
        <h1 className=" font-bold text-2xl mb-4 mt-10 text-center">
          Produtos em alta
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          <section className="w-full">
            <img
              className="w-full rounded-lg max-w-70 mb2"
              src="data:image/webp;base64,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"
              alt="logo do produto"
            />
            <p className="font-medium mt-1 mb-1">Airpods Pro</p>
            <div className="flex gap-3 items-center">
              <strong className="text-zinc-700/90"> R$ 2.500</strong>
              <button className="bg-zinc-900 p-1 rounded cursor-pointer">
                <BsCartPlus size={20} color="#fff" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
