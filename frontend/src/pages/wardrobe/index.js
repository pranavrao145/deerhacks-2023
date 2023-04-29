import styles from "./wardrobe.module.scss";

export default function Wardrobe() {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.addButton}>
        Add Item
      </button>
    </div>
  );
}
