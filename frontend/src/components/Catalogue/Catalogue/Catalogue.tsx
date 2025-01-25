import { useState } from "react";
import styles from "./catalogue.module.css";
import { filterConstants } from "../Filter/filterConstants";
import FilterComponent from "../Filter/FilterComponent";
import Search from "../Search/Search";
import List from "../List/List";

const Catalogue = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleFiltersChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className={styles.container}>
      <FilterComponent
        filterData={filterConstants}
        onFiltersChange={handleFiltersChange}
      />
      <div>
        <Search onSearchChange={handleSearchChange} />
        <List selectedFilters={selectedFilters} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Catalogue;
