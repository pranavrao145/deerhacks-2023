import { useEffect, useState } from "react";
import clothingItem from "../../assets/outfit.jpg";
import ClothingItemForm from "../../components/ClothingItemForm";
import styles from "./wardrobe.module.scss";

export default function Wardrobe() {
  const wardrobe = [
    {
      id: 1,
      name: "black top",
      img: clothingItem,
    },
    {
      id: 2,
      name: "white top",
      img: clothingItem,
    },
    {
      id: 3,
      name: "green top",
      img: clothingItem,
    },
    {
      id: 4,
      name: "skirt",
      img: clothingItem,
    },
  ];

  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleSearchForm = () => {
    setShowSearchForm(!showSearchForm);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleSearchFormSubmit = () => {
    toggleSearchForm();
  };

  const handleAddFormSubmit = () => {
    toggleSearchForm();
  };

  return (
    <div className={styles.container}>
      <h2>My Wardrobe</h2>
      <div className={styles.buttonsContainer}>
        <button
          type="button"
          onClick={toggleSearchForm}
          className={styles.button}
        >
          Search for item
        </button>
        <button type="button" onClick={toggleAddForm} className={styles.button}>
          Add item
        </button>
      </div>

      {showSearchForm && (
        <ClothingItemForm formType="search" onSubmit={handleSearchFormSubmit} />
      )}
      {showAddForm && (
        <ClothingItemForm formType="add" onSubmit={handleAddFormSubmit} />
      )}

      <div className={styles.outfitGrid}>
        {wardrobe.map(({ id, name, img }) => (
          <div className={styles.gridItemContainer} key={id}>
            <p>{name}</p>
            <div className={styles.imageContainer}>
              <img src={img} alt="clothing item" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
