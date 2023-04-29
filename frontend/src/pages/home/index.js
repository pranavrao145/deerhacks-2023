import outfit from "../../assets/outfit.jpg";
import styles from "./home.module.scss";

export default function Home() {
  const outfits = [
    {
      id: 1,
      img: outfit,
    },
    {
      id: 2,
      img: outfit,
    },
    {
      id: 3,
      img: outfit,
    },
  ];

  return (
    <div className={styles.container}>
      <h1>Hi user!</h1>
      <h3>Ready to look lavish?</h3>
      <h3>Favourited Outfits</h3>
      <div className={styles.outfitsContainer}>
        {outfits.map(({ id, img }) => (
          <div className={styles.imageContainer} key={id}>
            <img src={img} alt="outfit" />
          </div>
        ))}
      </div>
    </div>
  );
}
