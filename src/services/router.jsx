import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Profile from "../pages/Profile";
import Category1 from "../pages/Category1";
import Category2 from "../pages/Category2";
import Category3 from "../pages/Category3";
import Category4 from "../pages/Category4";
import Category5 from "../pages/Category5";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Home from "../components/home/Home";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <h2>404 NOT FOUND</h2>,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/categories/1',
        element: <Category1 />
      },
      {
        path: '/categories/2',
        element: <Category2 />
      },
      {
        path: '/categories/3',
        element: <Category3 />
      },
      {
        path: '/categories/4',
        element: <Category4 />
      },
      {
        path: '/categories/5',
        element: <Category5 />
      },
      {
        path: '/product/:id',
        element: <Product />
      },
      {
        path: '/cart',
        element: <Cart />
      }
    ],
  }
]);

export default router;