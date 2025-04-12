import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./login.module.css";
import { AuthContext } from "../../AuthProvider/AuthProvider";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { isAuthorized, setIsAuthorized } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: data.email, password: data.password }),
      });
      if (!response.ok) {
        throw new Error("Неверные учетные данные");
      }
      const result = await response.json();
      localStorage.setItem("token", result.token);
      setIsAuthorized(true);
      navigate("/requests");
    } catch (error) {
      console.error("Произошла ошибка: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Авторизация</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5 className={styles.titleForm}>Вход</h5>
        <div>
          <input
            className={`${styles.input} ${
              errors.email ? styles.error : styles.valid
            }`}
            type="email"
            placeholder="Введите e-mail"
            {...register("email", {
              required: "E-mail обязателен",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Введите e-mail в корректном формате",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className={styles.inputContainer}>
          <input
            className={`${styles.input} ${
              errors.password ? styles.error : styles.valid
            }`}
            type={showPassword ? "*********" : "password"}
            placeholder="Введите пароль"
            {...register("password", {
              required: "Пароль обязателен",
              minLength: {
                value: 8,
                message: "Длина пароля 8 или более символов",
              },
            })}
          />
          <button
            className={styles.buttonShowPassword}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          ></button>
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button className={styles.button} type="submit">
          ВОЙТИ
        </button>
      </form>
    </div>
  );
};

export default Login;
