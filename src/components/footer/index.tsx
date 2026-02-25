export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo / Descrição */}
        <div>
          <h2 className="text-xl font-bold text-white">Dev Shop</h2>
          <p className="text-sm mt-2">
            Projeto de e-commerce desenvolvido em React e TypeScript.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-2">Navegação</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/cart" className="hover:text-white">Carrinho</a></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-white font-semibold mb-2">Projeto</h3>
          <p className="text-sm">
            Feito para estudo de Front-end com foco em boas práticas.
          </p>
        </div>
      </div>

      <div className="border-t border-zinc-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Dev Shop — Todos os direitos reservados
      </div>
    </footer>
  );
}