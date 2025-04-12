import Tooltip from "../../Tooltip/Tooltip";
import styles from "./profilesList.module.css";

const ProfilesList = () => {
  const testUsers = [
    {
      name: "Первый пользователь",
      email: "test1example@gmail.com",
      password: "qwerty123",
    },
    {
      name: "Второй пользователь",
      email: "test2example@gmail.com",
      password: "qwerty123",
    },
    {
      name: "Третий пользователь",
      email: "test3example@gmail.com",
      password: "qwerty123",
    },
  ];

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Тестовые профили</h4>
      <div className={styles.profilesList}>
        {testUsers.map((user, index) => (
          <Tooltip text={"Логин и пароль для входа"}>
            <div className={styles.testUser} key={index}>
              <h5 className={styles.testUserName}>{user.name}</h5>
              <p className={styles.testUserDetais}>
                Логин: {user.email} <br />
                Пароль: {user.password}
              </p>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default ProfilesList;
