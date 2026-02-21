export function Cart() {
  return (
    <div className="w-full max-w-7xl px-4 mx-auto">
      <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>

      <section className="flex items-center justify-between border-b-2 border-gray-300">
        <img
          src="data:image/webp;base64,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"
          alt=""
          className="w-28"
        />

        <strong>Preço: R$1.00:99</strong>

        <div className="flex items-center justify-center gap-3">
          <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
            -
          </button>
          2
          <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
            +
          </button>
        </div>

        <strong className="float-right">
            subtotal: R$2.00:99
        </strong>
      </section>
      <p className="font-bold mt-4">Total: R$3000</p>
    </div>
  );
}
