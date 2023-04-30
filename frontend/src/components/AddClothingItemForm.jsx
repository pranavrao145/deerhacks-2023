import React, { useState } from "react";
import axios from "axios";
import styles from "./WardrobeItemForm.module.scss";
import { useNavigate } from "react-router-dom";
import useToken from "../utils/useToken";

export default function WardrobeItemForm() {
  const [itemType, setItemType] = useState("");
  const [color, setColor] = useState("");
  const [pattern, setPattern] = useState("");
  const navigate = useNavigate();
  const { token } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/add_cl_to_collection`,
      data: {
        clothing_type: itemType,
        colour: color,
        pattern: pattern,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.data.success) {
          navigate("/wardrobe");
        } else {
          navigate("/addWithPicture");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // do something with the selected file
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <label>
        Item Type:
        <select onChange={(e) => setItemType(e.target.value)} value={itemType}>
          <option value="" disabled></option>
          <option value="T-Shirt">T-Shirt</option>
          <option value="Sweater">Sweater</option>
          <option value="Sweatshirt">Sweatshirt</option>
          <option value="Shorts">Shorts</option>
          <option value="Jeans">Jeans</option>
          <option value="Pants">Pants</option>
          <option value="Skirt">Skirt</option>
          <option value="Dress">Dress</option>
        </select>
      </label>
      <label>
        Color:
        <select onChange={(e) => setColor(e.target.value)} value={color}>
          <option value="" disabled></option>
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Blue">Blue</option>
          <option value="Pink">Pink</option>
          <option value="Red">Red</option>
          <option value="Purple">Purple</option>
        </select>
      </label>
      <label>
        Pattern:
        <select onChange={(e) => setPattern(e.target.value)} value={pattern}>
          <option value="" disabled></option>
          <option value="Striped">Striped</option>
          <option value="Polka Dot">Polka Dot</option>
        </select>
      </label>

      <button className={styles.submitButton}>Submit</button>
    </form>
  );
}
