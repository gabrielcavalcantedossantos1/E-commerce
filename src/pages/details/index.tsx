import { Link, useParams } from "react-router-dom";
import { produtos } from "../../data/produtos";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export function Details() {
  const { id } = useParams<{ id: string }>();
  const { addItemCart, cart } = useContext(CartContext);

  if (!id) return <h1>Produto não encontrado</h1>;

  const IdProduto = Number(id);
  const produto = produtos.find((p) => p.id === IdProduto);

  if (!produto) return <h1>Produto não encontrado</h1>;

  // Verifica se já está no carrinho
  const itemNoCarrinho = cart.find((item) => item.id === IdProduto);

  function handleAddToCart() {
    if (!produto) return;
    addItemCart(produto);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Imagem do produto */}
      <div className="flex-1 flex justify-center">
        <img
          src={produto.cover}
          alt={produto.title}
          className="w-full max-w-md h-auto object-contain rounded-lg shadow"
        />
      </div>

      {/* Informações */}
      <div className="flex-1 flex flex-col">
        <Link to="/" className="mb-4 text-blue-600 hover:underline font-medium">
          Voltar
        </Link>

        <h1 className="text-3xl font-bold mb-2">{produto.title}</h1>

        <p className="text-2xl font-semibold text-zinc-800 mb-4">
          {produto.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        <p className="mb-6 text-zinc-700">{produto.description}</p>

        <button
          onClick={handleAddToCart}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            itemNoCarrinho ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={!!itemNoCarrinho}
        >
          {itemNoCarrinho ? "Já no carrinho" : "Adicionar ao carrinho"}
        </button>
      </div>
    </div>
  );
}
