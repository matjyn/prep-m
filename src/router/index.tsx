import { createBrowserRouter } from "react-router";
import { privateRoutes, publicRoutes } from "./routes";
import { MainLayout } from "../layout/MainLayout";
import { HomePage } from "../pages/HomePage";
import { TradePage } from "../pages/TradePage";
import { AuthProtected } from "./AuthProtected";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: publicRoutes.home, element: <HomePage /> },
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
