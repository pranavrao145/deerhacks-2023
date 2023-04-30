import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./WardrobeItemForm.module.scss";

export default function WardrobeItemForm(props) {
  const [itemType, setItemType] = useState("");
  const [color, setColor] = useState("");
  const [pattern, setPattern] = useState("");
  const [checkboxComponents, setCheckboxComponents] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/get_all_occasions`)
      .then((response) => {
        setCheckboxComponents(response.data);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    const itemName = event.target.value;
    setSelectedOccasions((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemName)) {
        return prevSelectedItems.filter((item) => item !== itemName);
      } else {
        return [...prevSelectedItems, itemName];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      <label>Occasion:</label>
      {checkboxComponents.map(({ id, name }) => (
        <label key={id}>
          <input
            type="checkbox"
            value={name}
            checked={selectedOccasions.includes(name)}
            onChange={handleCheckboxChange}
          />{" "}
          {name}
        </label>
      ))}

      <button className={styles.submitButton}>Submit</button>
    </form>
  );
}
