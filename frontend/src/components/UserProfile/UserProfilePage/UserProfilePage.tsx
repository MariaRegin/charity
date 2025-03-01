import styles from "./userProfilePage.module.css";
import PersonalData from "../PersonalData/PersonalData";
import Contacts from "../Contacts/Contacts";
import Favourites from "../Favourites/Favourites";
import user from "./user.png";
import { useLocation } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";

const UserProfilePage = () => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path ? styles.active : "";
  };

  return (
    <div className={styles.container}>
      <nav>
        <Link
          className={`${styles.tabBtn} ${isActive("/profile")}`}
          to="/profile"
        >
          Личные данные
        </Link>
        <Link
          className={`${styles.tabBtn} ${isActive("/profile/contacts")}`}
          to="/profile/contacts"
        >
          Контакты
        </Link>
        <Link
          className={`${styles.tabBtn} ${isActive("/profile/favourites")}`}
          to="/profile/favourites"
        >
          Избранное
        </Link>
      </nav>
      <div>
        <h2>Мой профиль</h2>
        <div>
          <img src={user} alt="user" />
          <h5></h5>
          <p>Статус:</p>
          <button>ВЫЙТИ ИЗ АККАУНТА</button>
        </div>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<PersonalData />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserProfilePage;
