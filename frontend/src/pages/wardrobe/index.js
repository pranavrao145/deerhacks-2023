import clothingItem from "../../assets/outfit.jpg";
import styles from "./wardrobe.module.scss";

export default function Wardrobe() {
  const wardrobe = [
    {
      id: 1,
      name: "black top",
      img: clothingItem,
    },
    {
      id: 2,
      name: "white top",
      img: clothingItem,
    },
    {
      id: 3,
      name: "green top",
      img: clothingItem,
    },
    {
      id: 4,
      name: "skirt",
      img: clothingItem,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>My Wardrobe</h2>
        <button type="button" className={styles.addButton}>
          Add Item
        </button>
      </div>

      <div className={styles.outfitGrid}>
        {wardrobe.map(({ id, name, img }) => (
          <div className={styles.gridItemContainer} key={id}>
            <p>{name}</p>
            <div className={styles.imageContainer}>
              <img src={img} alt="clothing item" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
