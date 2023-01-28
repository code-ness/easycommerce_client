import Container from "../Container/Container";
import styles from "./Header.module.scss";
import {ReactComponent as Logo} from "../../assets/logo.svg";

function Header() {
  return (
    <header className={styles.header}>
      <Container stylesProp={styles.container}>
        <div className={styles.headerLogo}>
          <Logo />
          <h3>EasyCommerce</h3>
        </div>

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
          <a href="#">Login</a>
        </div>
      </Container>
    </header>
  )
}

export default Header;