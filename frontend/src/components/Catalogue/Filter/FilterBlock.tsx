import styles from "./filterBlock.module.css";
import React from "react";

interface Option {
  name: string;
  label: string;
}

interface FilterBlockProps {
  title: string;
  options: Option[];
  selectedFilters: { [key: string]: boolean };
  onFilterChange: (name: string, isChecked: boolean) => void;
}

const FilterBlock: React.FC<FilterBlockProps> = ({
  title,
  options,
  selectedFilters,
  onFilterChange,
}) => {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    onFilterChange(name, checked);
  };

  return (
    <>
      <h5 className={styles.name}>{title}</h5>
      {options.map((option) => (
        <div className={styles.option} key={option.name}>
          <label>
            <input
              type="checkbox"
              name={option.name}
              checked={selectedFilters[option.name] || false}
              onChange={handleCheckboxChange}
            />
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default FilterBlock;
