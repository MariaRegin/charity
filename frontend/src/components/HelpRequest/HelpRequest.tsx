import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./helpRequest.module.css";
import ModalContent from "./ModalContent";

interface RequestData {
  title?: string;
  organization?: { title: string };
  description?: string;
  goalDescription?: string;
  actionsSchedule?: Array<{ stepLabel: string; isDone?: boolean }>;
  endingDate?: string;
  location?: { district: string; city: string };
  contacts?: { phone: string; email: string; website: string };
  contributorsCount?: string;
}

const HelpRequest = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [request, setRequest] = useState<RequestData | null>(null);
  const [modalText, setModalText] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`/api/request/${id}`, {
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
          return;
        }
        const data = await response.json();
        setRequest(() => data);
        console.log("Data received:", data);
      } catch (error) {
        console.error("Произошла ошибка:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, [id]);

  const handleHelpClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await fetch(`/api/request/${id}/contribution`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setModalText("Успех! Спасибо за помощь.");
      } else {
        setModalText(
          "Ошибка! Не удалось отправить запрос. Порпобуйте повторить позже."
        );
        throw new Error(`HTTP error! status:${response.status}`);
      }
      console.log(response);
      openModal();
    } catch (error) {
      console.error("Произошла ошибка: ", error);
    }
  };

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Запрос о помощи</h2>
        {request && (
          <div className={styles.request}>
            <h3>{request?.title}</h3>
            <h5>Организация</h5>
            <p>{request?.organization?.title}</p>
            <h5>Кому мы помогаем</h5>
            <p>{request?.description}</p>
            <h5>Цель сбора</h5>
            <p>{request?.goalDescription}</p>
            <h5>План действий</h5>
            <ul>
              {request?.actionsSchedule?.map((item, index) => (
                <li key={index}>{item.stepLabel}</li>
              ))}
            </ul>
            <h5>Завершение</h5>
            <p>{request?.endingDate}</p>
            <h5>Локация</h5>
            <p>
              Область: {request?.location?.district} Населенный пункт:{" "}
              {request.location?.city}
            </p>
            <h5>Контакты</h5>
            <p>Телефон: {request?.contacts?.phone}</p>
            <p> Email: {request?.contacts?.email}</p>
            <p>Сайт: {request?.contacts?.website}</p>
          </div>
        )}
      </div>
      {request && (
        <div className={styles.summary}>
          <h5>Вместе для добрых дел</h5>
          <p>Цель сбора {request?.goalDescription}</p>
          <p>Завершение {request?.endingDate}</p>
          <p>Мы собрали</p>
          <p>Нас уже: {request?.contributorsCount}</p>
          <button className={styles.button} onClick={handleHelpClick}>
            ПОМОЧЬ
          </button>
          <ModalContent
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            modalText={modalText}
          />
        </div>
      )}
    </div>
  );
};

export default HelpRequest;
