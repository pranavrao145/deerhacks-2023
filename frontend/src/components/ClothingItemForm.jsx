import React, { useState, useEffect } from "react";
import styles from "./ClothingItemForm.module.scss";

export default function ClothingItemForm({ formType }) {
  const [itemType, setItemType] = useState("");
  const [color, setColor] = useState("");
  const [pattern, setPattern] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      {formType == "add" && <div>UPLOAD IMAGE FEATURE</div>}
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

      <button className={styles.addButton}>Add Course</button>
    </form>
  );
}
