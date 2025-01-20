import { useState, useEffect } from "react";
import styles from "./list.module.css";
import ListItem from "./ListItem";
import MapView from "../Catalogue/MapView";

const List = () => {
  const [requests, setRequests] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://natticharity.eveloth.ru/api/request",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setRequests(data);
    };
    fetchRequests();
  }, []);

  const renderRequests = () => {
    if (viewMode === "list") {
      return (
        <div className={styles.list}>
          {requests.map((request) => (
            <ListItem key={request.id} request={request} />
          ))}
        </div>
      );
    } else if (viewMode === "map") {
      return <MapView requests={requests} />;
    } else {
      return (
        <div className={styles.grid}>
          {requests.map((request) => (
            <ListItem key={request.id} request={request} />
          ))}
        </div>
      );
    }
  };

  return (
    // <div className={styles.container}>
    //   {requests.map((request) => (
    //     <ListItem request={request} />
    //   ))}
    // </div>

    <div>
      <div>
        <button onClick={() => setViewMode("grid")}>Сетка</button>
        <button onClick={() => setViewMode("list")}>Список</button>
        <button onClick={() => setViewMode("map")}>Карта</button>
      </div>
      <div className={styles.container}>{renderRequests()}</div>
    </div>
  );
};

export default List;
