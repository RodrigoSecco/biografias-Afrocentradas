import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import "./styles.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

export const Card = ({ image, name, description }) => {
  const [liked, setLiked] = useState(false);

  const updateLiked = (value) => {
    setLiked(value);
  };

  async function favorite() {
    try {
      const docRef = await addDoc(collection(db, "favorites"), {
        name: name,
        image: image,
        description: description,
      });
      updateLiked(true);
      console.log("Favoritado!");
    } catch (e) {
      console.log("Erro ao adicionar!");
    }
  }

  async function unfavorite() {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "favorites"), where("name", "==", name))
      );
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      updateLiked(false);
      console.log("Descurtido!");
    } catch (e) {
      console.log("Erro ao remover!");
    }
  }

  useEffect(() => {
    const checkLiked = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "favorites"), where("name", "==", name))
      );
      updateLiked(!querySnapshot.empty);
    };
    checkLiked();
  }, [name]);

  return (
    <div className="card">
      <img className="imagem" src={image} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      {!liked ? (
        <button className="likeButton" onClick={favorite}>
          <FaHeart size={24} color="red" className="icon2" />
          Favoritar
        </button>
      ) : (
        <button className="unlikeButton" onClick={unfavorite}>
          <FiHeart size={24} color="red" className="icon2" />
          Remover
        </button>
      )}
      <button className="moreButton">
        <Link to={name}>Saiba Mais</Link>
      </button>
    </div>
  );
};
