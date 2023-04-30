import SearchClothingItemForm from "../../components/SearchClothingItemForm";
import styles from "./search.module.scss";

export default function Search() {
  return (
    <div className={styles.container}>
      <h2>Search for item</h2>
      <p>Search for an item in database by providing clothing attributes.</p>
      <SearchClothingItemForm />
    </div>
  );
}
