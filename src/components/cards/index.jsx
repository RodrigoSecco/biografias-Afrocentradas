import "./styles.css";
import { Link } from "react-router-dom";

export const Card = ({
  key,
  image,
  name,
  description,
  myObject,
  updateMyObject,
}) => {
  const handleButtonClick = () => {
    updateMyObject((prevObject) => ({
      ...prevObject,
      favorite: !prevObject.favorite,
    }));
  };
  return (
    <div class="card">
      <img className="imagem" src={image} />
      <h2>{name}</h2>
      <p>{description}</p>
      <button className="likeButton" onClick={handleButtonClick}>
        {myObject.favorite ? "Descurtir" : "Curtir"}
      </button>
      <button className="moreButton">
        <Link to={name}>Saiba Mais</Link>
      </button>
    </div>
  );
};
