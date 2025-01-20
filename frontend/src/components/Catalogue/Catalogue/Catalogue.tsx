import styles from "./catalogue.module.css";
import { filterConstants } from "../Filter/filterConstants";
import FilterComponent from "../Filter/FilterComponent";
import Search from "../Search/Search";
import List from "../List/List";

const Catalogue = () => {
  const handleSearch = () => {};

  return (
    <div className={styles.container}>
      <FilterComponent filterData={filterConstants} />
      <div>
        <Search onSearch={handleSearch} />
        <List />
      </div>
    </div>
  );
};

export default Catalogue;
