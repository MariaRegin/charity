import styles from "./filterComponent.module.css";
import { useState } from "react";
import FilterBlock from "./FilterBlock";

const FilterComponent = ({ filterData, onFiltersChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (name, isChecked) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [name]: isChecked,
    }));
    onFiltersChange({ ...selectedFilters, [name]: isChecked });
  };

  const handleReset = () => {
    setSelectedFilters({});
    onFiltersChange({});
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Фильтрация </h4>
      {filterData.map((filter) => (
        <FilterBlock
          key={filter.title}
          title={filter.title}
          options={filter.options}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      ))}
      <button className={styles.button} onClick={handleReset}>
        СБРОСИТЬ
      </button>
    </div>
  );
};

export default FilterComponent;
