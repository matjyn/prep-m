import { Link } from "react-router";
import { privateRoutes, publicRoutes } from "../../router/routes";
import { UserInfo } from "../common/UserInfo";
import "./header.styles.css";

const Header = () => {
  return (
    <header className="header flex justify-between align-center p-3 border radius-md">
      <div className="flex gap-3">
        <Link to={publicRoutes.home}>Home</Link>
        <Link to={privateRoutes.trade}>Trade</Link>
      </div>

      <div>
        <UserInfo />
      </div>
    </header>
  );
};

export { Header };
