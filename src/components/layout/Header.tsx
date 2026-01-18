import { Link } from "react-router";
import "./header.styles.css";
import { privateRoutes, publicRoutes } from "../../router/routes";
import { UserInfo } from "../common/UserInfo";

const Header = () => {
  return (
    <header className="header">
      <div className="header-link">
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
