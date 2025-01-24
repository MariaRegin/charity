import { useState } from "react";
import styles from "./catalogue.module.css";
import { filterConstants } from "../Filter/filterConstants";
import FilterComponent from "../Filter/FilterComponent";
import Search from "../Search/Search";
import List from "../List/List";

const Catalogue = () => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFiltersChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSearch = () => {};

  return (
    <div className={styles.container}>
      <FilterComponent
        filterData={filterConstants}
        onFiltersChange={handleFiltersChange}
      />
      <div>
        <Search onSearch={handleSearch} />
        <List selectedFilters={selectedFilters} />
      </div>
    </div>
  );
};

export default Catalogue;
