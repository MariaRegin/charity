import { useState } from "react";
import styles from "./search.module.css";

const Search = ({
  placeholder = "Введите название задачи или организации",
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Найти запрос</h4>
      <input
        className={styles.input}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <button type="button" onClick={handleSearchClick}></button>
    </div>
  );
};

export default Search;
