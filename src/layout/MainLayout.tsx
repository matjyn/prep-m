import { Outlet } from "react-router";
import { Header } from "../components/layout/Header";
import { useUserStore } from "../stores/user";

const MainLayout = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="p-3">
      <Header />

      <div>{user ? <Outlet /> : <div>You must login first!</div>}</div>
    </div>
  );
};

export { MainLayout };
