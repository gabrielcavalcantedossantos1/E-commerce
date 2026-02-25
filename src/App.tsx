import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Layout } from "./components/Layout";

import { createBrowserRouter } from "react-router-dom";
import { Details } from "./pages/details";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/produto/:id",
        element: <Details />,
      },
    ],
  },
]);

export { router };
