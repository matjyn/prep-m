import { createBrowserRouter } from "react-router";
import { privateRoutes, publicRoutes } from "./routes";
import { MainLayout } from "../layout/MainLayout";
import { Home } from "../pages/Home";
import { TradePage } from "../pages/Trade";
import { AuthProtected } from "./AuthProtected";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: publicRoutes.home, element: <Home /> },
      {
        path: privateRoutes.trade,
        element: (
          <AuthProtected>
            <TradePage />
          </AuthProtected>
        ),
      },
    ],
  },
]);

export { router };
