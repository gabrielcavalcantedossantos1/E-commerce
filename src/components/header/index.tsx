import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full px-1 bg-slate-200">
      <nav>
        <Link to="/">Dev Shop</Link>

        <Link to="/cart">
          <FiShoppingCart size={24} color="#121212" />
        </Link>
      </nav>
    </header>
  );
}
