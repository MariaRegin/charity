import { useState, useEffect, useMemo } from "react";
import styles from "./list.module.css";
import ListItem from "./ListItem";
import MapView from "../Catalogue/MapView";
import filterRules from "../Filter/filterRules";

const List = ({ selectedFilters, searchTerm }) => {
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

  const renderRequests = () => {
    if (viewMode === "list") {
      return (
        <div className={styles.list}>
          {filteredRequests.map((request) => (
            <ListItem key={request.id} request={request} />
          ))}
        </div>
      );
    } else if (viewMode === "map") {
      return <MapView requests={filteredRequests} />;
    } else {
      return (
        <div className={styles.grid}>
          {filteredRequests.map((request) => (
            <ListItem key={request.id} request={request} />
          ))}
        </div>
      );
    }
  };

  return (
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
