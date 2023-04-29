import styles from "./wardrobe.module.scss";

export default function Wardrobe() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button type="button" className={styles.addButton}>
          Add Item
        </button>
      </div>
    </div>
  );
}
