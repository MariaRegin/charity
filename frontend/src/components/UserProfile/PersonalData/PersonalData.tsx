import { useEffect, useState } from "react";

const PersonalData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          console.error(
            "Ошибка при получении данных",
            response.status,
            response.statusText
          );
          setError(new Error(`HTTP error! status: ${response.status}`));
          return;
        }
        const data = await response.json();
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Произошла ошибка:", error);
        setError(error as Error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <h5>Профиль</h5>
      <p>
        Фамилия: {userData.lastName} Имя: {userData.name}
      </p>
      <h5>Дата рождения {new Date(userData.birthdate).toLocaleDateString()}</h5>
      <p></p>
      <h5>Локация для помощи</h5>
      {userData?.baseLocations?.map((item, index) => (
        <p key={index}>
          Область: {item.district} Населенный пункт: {item.city}
        </p>
      ))}
      <h5>Образование</h5>
      {userData?.educations?.map((item, index) => (
        <p key={index}>
          Учреждение: {item.organizationName} Уровень образования: {item.level}{" "}
          Направление: {item.specialization} Год окончания:{" "}
          {item.graduationYear}
        </p>
      ))}
      <h5>Обо мне</h5>
      <p>{userData.additionalInfo}</p>
    </div>
  );
};

export default PersonalData;
