import { Card } from "../../components/cards";
import { Navbar } from "../../components/navbar";
import logo from "../../images/Rustic_Printed-removebg-preview.png";
import carolina from "../../images/carolina.webp";
import marielle from "../../images/marielle-franco.webp";
import miltom from "../../images/milton_santos.webp";
import machado from "../../images/machado-de-assis.webp";
import dandara from "../../images/capa_dandara.jpeg";
import abdias from "../../images/abdias-do-Nascimento.jpg";
import "./styles.css";
import honoredPeople from "../Home/people.json";
import { Footer } from "../../components/footer";

export const Favorites = () => {
  const imageMap = {
    carolina: carolina,
    marielle: marielle,
    miltom: miltom,
    machado: machado,
    dandara: dandara,
    abdias: abdias,
  };
  return (
    <div className="listCardsFavotite">
      <Navbar />

      <div>
        <h1>Meus Favoritos</h1>
        <div className="peopleCardsHome">
          {honoredPeople.honoredPeople.map((card, index) => {
            const image = imageMap[card.image] || null;
            if (card.favorite) {
              return (
                <Card
                  key={index}
                  image={image}
                  name={card.name}
                  description={card.description}
                  //curtir="Descurtir"
                />
              );
            }
          })}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
