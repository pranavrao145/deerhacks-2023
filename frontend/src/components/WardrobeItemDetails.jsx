import { useParams } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import clothingItem from "../assets/outfit.jpg";
import styles from "./WardrobeItemDetails.module.scss";

export default function WardrobeItemDetails() {
  // replace this with the logic to fetch the wardrobe item details from database
  const { id } = useParams();
  const wardrobeItem = {
    id: 1,
    name: "black top",
    img: clothingItem,
  }; 

  return (
    <div className={styles.container}>
      <h2>{wardrobeItem.name}</h2>
      <div className={styles.imageContainer}>
        <img src={wardrobeItem.img} alt="clothing item" />
      </div>
    </div>
  );
}
