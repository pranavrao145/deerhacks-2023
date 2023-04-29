import { useEffect, useState } from "react";
import clothingItem from "../../assets/outfit.jpg";
import WardrobeItemForm from "../../components/WardrobeItemForm";
import styles from "./wardrobe.module.scss";
import { Link } from "react-router-dom";

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
    setShowAddForm(false);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setShowSearchForm(false);
  };

  const handleSearchFormSubmit = () => {
    toggleSearchForm();
  };

  const handleAddFormSubmit = () => {
    toggleAddForm();
  };

  return (
    <div className={styles.container}>
      <h2>My Wardrobe</h2>
      <div className={styles.buttonsContainer}>
        {!showSearchForm && !showAddForm && (
          <>
            <button
              type="button"
              onClick={toggleSearchForm}
              className={styles.button}
            >
              Search for item
            </button>
            <button
              type="button"
              onClick={toggleAddForm}
              className={styles.button}
            >
              Add item
            </button>
          </>
        )}
        {(showSearchForm || showAddForm) && (
          <button
            type="button"
            onClick={() => {
              setShowSearchForm(false);
              setShowAddForm(false);
            }}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancel
          </button>
        )}
      </div>

      {showSearchForm && (
        <WardrobeItemForm formType="search" onSubmit={handleSearchFormSubmit} />
      )}
      {showAddForm && (
        <WardrobeItemForm formType="add" onSubmit={handleAddFormSubmit} />
      )}

      <div className={styles.outfitGrid}>
        {wardrobe.map(({ id, name, img }) => (
          <Link
            to={`/wardrobe/${id}`}
            className={styles.gridItemContainer}
            key={id}
          >
            <p>{name}</p>
            <div className={styles.imageContainer}>
              <img src={img} alt="clothing item" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
