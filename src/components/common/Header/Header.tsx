import { Link, useLocation } from "react-router";
import "./header.styles.css";
import { privateRoutes, publicRoutes } from "../../../router/routes";
import { UserInfo } from "../UserInfo";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header flex justify-between align-center p-3 border radius-md">
      <div className="flex gap-3">
        <Link
          to={publicRoutes.home}
          className={location.pathname === publicRoutes.home ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to={privateRoutes.trade}
          className={location.pathname === privateRoutes.trade ? "active" : ""}
        >
          Trade
        </Link>
      </div>

      <div>
        <UserInfo />
      </div>
    </header>
  );
};

export { Header };
