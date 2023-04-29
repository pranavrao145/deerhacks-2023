import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import WardrobeItemDetails from "../../components/WardrobeItemDetails";
import styles from "./wardrobeItem.module.scss";

export default function WardrobeItem() {
  const navigate = useNavigate();

  const goBack = async () => {
    navigate("/wardrobe");
  };

  // delete item from database and return to wardrobe page
  const handleDelete = async () => {
    goBack();
  };

  return (
    <div className={styles.container}>
      <WardrobeItemDetails />
      <div className={styles.buttons}>
        <span onClick={goBack} className={styles.button}>
          <HiOutlineArrowNarrowLeft size={35} />
        </span>
        <span onClick={handleDelete} className={styles.button}>
          <RiDeleteBinLine size={25} />
        </span>
      </div>
    </div>
  );
}
