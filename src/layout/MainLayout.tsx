import { Outlet } from "react-router";
import { Header } from "../components/layout/Header";
import { useUserStore } from "../stores/user";
import "./mainLayout.styles.css";

const MainLayout = () => {
  const user = useUserStore((state) => state.user);

  return (
    <>
      <Header />

      <div className="main">
        {user ? <Outlet /> : <div className="welcome-message">You must login first!</div>}
      </div>
    </>
  );
};

export { MainLayout };
