import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import OutfitDetails from "../../components/OutfitDetails";
import axios from "axios";
import useToken from "../../utils/useToken";

export default function WardrobeItem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useToken();

  const goBack = async () => {
    navigate("/");
  };

  // delete item from database and return to home page
  const handleDelete = async () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/remove_outfit_from_collection/${id}`,
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
    <div>
      <OutfitDetails wardrobe_item_id={id} />
      <div>
        <span onClick={goBack}>
          <HiOutlineArrowNarrowLeft size={35} />
        </span>
        <span onClick={handleDelete}>
          <RiDeleteBinLine size={25} />
        </span>
      </div>
    </div>
  );
}
