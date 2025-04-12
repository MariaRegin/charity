import { useState } from "react";
import styles from "./catalogue.module.css";
import { filterConstants } from "../Filter/filterConstants";
import FilterComponent from "../Filter/FilterComponent";
import Search from "../Search/Search";
import List from "../List/List";

interface Filter {
  [key: string]: string | string[];
}

const Catalogue: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Filter>({});
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleFiltersChange = (filters: Filter) => {
    setSelectedFilters(filters);
  };

  const handleSearchChange = (term: string) => {
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
