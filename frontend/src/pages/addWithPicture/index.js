import AddClothingItemFormWithPicture from "../../components/AddClothingItemFormWithPicture";
// import styles from "./add.module.scss";

export default function AddWithPicture() {
  return (
    <div >
      <h2>Add item to collection</h2>
      <p>
        Sorry, looks like we don't have your item in our database. Add a new
        item to collection by uploading an image and providing the corresponding
        attributes.
      </p>
      <AddClothingItemFormWithPicture />
    </div>
  );
}
