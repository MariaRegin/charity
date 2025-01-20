import styles from "./header.module.css";
import logo from "./logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="#">
        <img className={styles.logo} src={logo} alt="logo" />
      </a>
      <h1 className={styles.title}>Запросы о помощи</h1>
      <button className={styles.button}></button>
    </header>
  );
};

export default Header;
