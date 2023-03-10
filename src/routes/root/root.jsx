import Header from "../../components/Header/Header";
import styles from "./root.module.scss";

function Root() {
  return (
    <div className={styles.root}>
      <Header />
      <div style={{height: "calc(100vh - 75px)"}}></div>
    </div>
  )
}

export default Root;
