import styles from "./Container.module.scss";

function Container({stylesProp, children}) {
  return <div className={`${styles.container} ${stylesProp}`}>{children}</div>
}

export default Container;