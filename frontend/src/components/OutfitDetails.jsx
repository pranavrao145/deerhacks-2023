import { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import axios from "axios";
import useToken from "../utils/useToken";

export default function OutfitDetails(props) {
  const [_, setId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [favourite, setFavourite] = useState("");
  const [clothes, setClothes] = useState("");
  const [occasions, setOccasions] = useState("");
  const [userId, setUserId] = useState("");
  const { token } = useToken();

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}/get_outfit_info/${props.wardrobe_item_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setId(response.data.id);
        setImageUrl(response.data.image_url);
        setFavourite(response.data.favourite);
        setClothes(response.data.clothes);
        setOccasions(response.data.occasions);
        setUserId(response.data.userId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>
        <img src={imageUrl} alt="outfit" />
      </div>
      <div>{clothes}</div>
      <p>Occasions to be worn in: {occasions}</p>
      {favourite && (
        <span>
          <AiFillHeart size={25} />
        </span>
      )}
    </div>
  );
}
