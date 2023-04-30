import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import WardrobeItemDetails from "../../components/WardrobeItemDetails";
import styles from "./wardrobeItem.module.scss";
import axios from "axios";
import useToken from "../../utils/useToken";

export default function WardrobeItem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useToken();

  const goBack = async () => {
    navigate("/wardrobe");
  };

  // delete item from database and return to wardrobe page
  const handleDelete = async () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/remove_cl_from_collection/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <WardrobeItemDetails wardrobe_item_id={id} />
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
