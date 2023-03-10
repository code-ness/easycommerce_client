import Container from "../Container/Container";
import { Link } from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";

function Header() {
  const {user, login, logout} = useAuth();

  const authLogout = user ? <button onClick={() => logout()}>Log Out</button> : <Link to="/login">Sign In</Link>;
  const userProfile = user ? <Link to="/profile">Profile</Link> : "";
  return (
    <header className={styles.header}>
      <Container stylesProp={styles.container}>
        <Logo />
        <nav className={styles.headerNav}>
          <ul>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Customers</a>
            </li>
            <li>
              <a href="#">Docs</a>
            </li>
          </ul>
        </nav>

        <div className={styles.headerProfile}>
          {authLogout}
          {userProfile}
        </div>
      </Container>
    </header>
  )
}

export default Header;