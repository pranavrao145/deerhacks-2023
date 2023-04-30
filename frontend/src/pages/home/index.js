import { useState, useEffect } from "react";
import axios from "axios";
import useToken from "../../utils/useToken";
import styles from "./home.module.scss";

export default function Home() {
  const [favOutfits, setFavOutfits] = useState([]);
  const { token } = useToken();

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}/get_favourite_outfits`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setFavOutfits(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Hi user!</h1>
      <h3>Ready to look lavish?</h3>
      <h3>Favourited Outfits</h3>
      <div className={styles.outfitsContainer}>
        {favOutfits.map(({ id, image_url }) => (
          <div className={styles.imageContainer} key={id}>
            <img src={image_url} alt="outfit" />
          </div>
        ))}
      </div>
    </div>
  );
}
