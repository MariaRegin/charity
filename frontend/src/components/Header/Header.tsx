import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import logo from "./logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Header = () => {
  const { isAuthorized, setIsAuthorized } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthorized(false);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>
      <h1 className={styles.title}>Запросы о помощи</h1>
      {isAuthorized ? (
        <div className={styles.dropdown}>
          <button
            className={styles.button}
            onClick={handleToggleDropdown}
          ></button>
          <div
            className={`${styles.dropdownContent} ${
              isVisible ? styles.show : ""
            }`}
          >
            <Link to={"/profile"}>Мой профиль</Link>
            <button onClick={handleLogout}>Выйти</button>
          </div>
        </div>
      ) : (
        <button>Войти</button>
      )}
    </header>
  );
};

export default Header;
