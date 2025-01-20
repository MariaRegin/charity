import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!email.includes("@")) {
      emailError = "Некорректный e-mail";
    }

    if (password.length < 6) {
      passwordError = "Пароль должен содержать минимум 6 символов";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch(
          "https://natticharity.eveloth.ru/api/auth/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ login: email, password: password }),
          }
        );
        if (!response.ok) {
          throw new Error("Неверные учетные данные");
        }
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/requests");
      } catch (error) {
        setErrors({ ...errors, password: error.message });
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <h4 className={styles.titleForm}>Вход</h4>
        <div>
          <input
            className={styles.input}
            type="email"
            placeholder="Введите e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </div>
        <div>
          <input
            className={styles.input}
            type={showPassword ? "*********" : "password"}
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => setShowPassword(!showPassword)}>Глаз</button>
          {showPassword ? "Скрыть" : "Показать"}
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password}</span>
          )}
        </div>
        <button className={styles.button} type="submit">
          ВОЙТИ
        </button>
      </form>
    </div>
  );
};

export default Login;
