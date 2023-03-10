import { Link } from "react-router-dom";
import {ReactComponent as LogoImage} from "../../assets/logo.svg";

import styles from "./Logo.module.scss";

function Logo() {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <LogoImage />
        <h3>EasyCommerce</h3>
      </Link>
    </div>
  )
}

export default Logo;