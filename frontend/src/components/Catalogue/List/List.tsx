import styles from "./list.module.css";
import { useState, useEffect, useMemo } from "react";
import ListItem from "./ListItem";
import MapView from "../Catalogue/MapView";
import filterRules from "../Filter/filterRules";
import notFound from "./not-found.png";
import errorFetching from "./error.png";
import ListView from "../Catalogue/ListView";

const List = ({ selectedFilters, searchTerm }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRequestsList, setFilteredRequestsList] = useState([]);
  const [requests, setRequests] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("/api/request", {
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
        setRequests(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Произошла ошибка:", error);
        setError(error as Error);
      }
    };
    fetchRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      for (const filterName in selectedFilters) {
        if (selectedFilters[filterName] && !filterRules[filterName](request)) {
          return false;
        }
      }
      if (searchTerm) {
        const searchFields = [
          request.title,
          request.organization.title,
          request.goalDescription,
        ];
        if (
          !searchFields.some((field) =>
            field.toLowerCase().includes(searchTerm.toLowerCase())
          )
        ) {
          return false;
        }
      }
      return true;
    });
  }, [requests, selectedFilters, searchTerm]);

  useEffect(() => {
    setFilteredRequestsList(filteredRequests);
  }, [filteredRequests]);

  const renderRequests = () => {
    if (viewMode === "list") {
      return <ListView requests={filteredRequestsList} />;
    } else if (viewMode === "map") {
      return <MapView requests={filteredRequestsList} />;
    } else {
      return (
        <div className={styles.grid}>
          {filteredRequestsList.map((request) => (
            <ListItem key={request.id} request={request} />
          ))}
        </div>
      );
    }
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error)
    return (
      <div>
        <img src={errorFetching} alt="error" />
        <p>Ошибка! Не удалось загрузить информацию</p>
      </div>
    );

  return (
    <>
      <div>
        <button onClick={() => setViewMode("grid")}>Сетка</button>
        <button onClick={() => setViewMode("list")}>Список</button>
        <button onClick={() => setViewMode("map")}>Карта</button>
      </div>
      {filteredRequestsList.length === 0 ? (
        <div>
          <img src={notFound} alt="no results" />
          <p>Запросы не найдены</p>
        </div>
      ) : (
        <div className={styles.container}>{renderRequests()}</div>
      )}
    </>
  );
};

export default List;
