import ErrorTooltip from "../../ErrorTooltip/ErrorTooltip";
import Login from "../Login/Login";
import ProfilesList from "../ProfilesList/ProfilesList";
import styles from "./mainPage.module.css";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <Login />
      <ProfilesList />
      <ErrorTooltip text={"Ошибка! Попробуйте еще раз"} />
    </div>
  );
};

export default MainPage;
