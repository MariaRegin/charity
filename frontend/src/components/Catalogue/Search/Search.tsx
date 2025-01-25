import { useState } from "react";
import styles from "./search.module.css";

const Search = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearchChange(term);
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Найти запрос</h4>
      <input
        className={styles.input}
        type="text"
        placeholder="Введите название задачи или организации"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
