import { createBrowserRouter } from "react-router";
import { privateRoutes, publicRoutes } from "./routes";
import { MainLayout } from "../layout/MainLayout";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: publicRoutes.home, element: <div>Home</div> },
      { path: privateRoutes.trade, element: <div>Trade</div> },
    ],
  },
]);

export { router };
