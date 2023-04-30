import { useState, useEffect } from "react";
import axios from "axios";
import useToken from "../utils/useToken";
import styles from "./WardrobeItemDetails.module.scss";
import { useParams } from "react-router-dom";

export default function WardrobeItemDetails(props) {
  const [_, setId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [clothingType, setClothingType] = useState("");
  const [colour, setColour] = useState("");
  const [pattern, setPattern] = useState("");
  const [occasions, setOccasions] = useState("");
  const { token } = useToken();

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}/get_cl_info/${props.wardrobe_item_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setId(response.data.id);
        setImageUrl(response.data.image_url);
        setClothingType(response.data.clothing_type);
        setColour(response.data.colour);
        setPattern(response.data.pattern);
        setOccasions(response.data.occasions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.itemContainer}>
      <h2>{`${colour} ${clothingType} with ${pattern}`}</h2>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt="wardrobe item" />
      </div>
      <p>Occasions to be worn in: {occasions}</p>
    </div>
  );
}
