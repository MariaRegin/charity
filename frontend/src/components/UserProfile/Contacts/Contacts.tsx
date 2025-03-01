import { useEffect, useState } from "react";

const Contacts = () => {
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
      <h5>E-mail</h5>
      <p> {userData?.contacts?.email}</p>
      <h5>Телефон</h5>
      <p>{userData?.contacts?.phone}</p>
      <h5>Социальные сети</h5>
      <p>
        Telegram: {userData?.contacts?.social.telegram} VK:{" "}
        {userData?.contacts?.social.vk} WhatsApp:{" "}
        {userData?.contacts?.social.whatsapp}
      </p>
    </div>
  );
};

export default Contacts;
