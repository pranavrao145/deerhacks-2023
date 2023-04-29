import { Link } from "react-router-dom";
import clothingItem from "../../assets/outfit.jpg";

export default function Recommendations() {
  const outfits = [
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
  ];
    return (
      <div className={styles.container}>
        {outfits.map(({ id, name, img }) => (
          <Link
            to={`/recommendations/${id}`}
            className={styles.outfitContainer}
            key={id}
          >
            <p>{name}</p>
            <div className={styles.imageContainer}>
              <img src={img} alt="clothing item" />
            </div>
          </Link>
        ))}
      </div>
    );
}