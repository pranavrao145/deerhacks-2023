import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import WardrobeItemDetails from "../../components/WardrobeItemDetails";
import styles from "./wardrobeItem.module.scss";

export default function WardrobeItem() {
  const navigate = useNavigate();

  const goBack = async () => {
    navigate("/wardrobe");
  };

  return (
    <div className={styles.container}>
      <WardrobeItemDetails />
      <span onClick={goBack} className={styles.backButton}>
        <HiOutlineArrowNarrowLeft size={35} />
      </span>
    </div>
  );
}
