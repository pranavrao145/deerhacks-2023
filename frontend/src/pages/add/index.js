import AddClothingItemForm from "../../components/AddClothingItemForm";
import styles from "./add.module.scss";

export default function Search() {
  return (
    <div className={styles.container}>
      <h2>Add item to collection</h2>
      <p>Add a new item to collection by searching if its attributes exist in our database.</p>
      <AddClothingItemForm />
    </div>
  );
}
