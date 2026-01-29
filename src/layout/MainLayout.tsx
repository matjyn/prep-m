import { Outlet } from "react-router";
import { Header } from "../components/common/Header/Header";

const MainLayout = () => {
  return (
    <div className="p-3">
      <Header />

      <div className="py-3">
        <Outlet />
      </div>
    </div>
  );
};

export { MainLayout };
