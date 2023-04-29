import wardrobeItemImg from "../assets/outfit.jpg";
import styles from "./WardrobeItemDetails.module.scss";

export default function WardrobeItemDetails() {
  // replace this with the logic to fetch the wardrobe item details from database
  const wardrobeItem = {
    id: 1,
    name: "black top",
    img: wardrobeItemImg,
  }; 

  return (
    <div className={styles.itemContainer}>
      <h2>{wardrobeItem.name}</h2>
      <div className={styles.imageContainer}>
        <img src={wardrobeItem.img} alt="wardrobe item" />
      </div>
    </div>
  );
}
