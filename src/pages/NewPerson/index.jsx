import { Navbar } from "../../components/navbar";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { useState } from "react";
import "./styles.css";

export const NewPerson = () => {
  const [namePerson, setNamePerson] = useState("");
  const [image, setImage] = useState("");
  const [smallDescriptiopn, setSmallDescriptiopn] = useState("");
  const [longDescription, setLongDescription] = useState("");

  function showToast(text) {
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = text;

    var container = document.getElementById("toastContainer");
    container.appendChild(toast);

    toast.classList.add("show");

    setTimeout(function () {
      toast.classList.remove("show");
      container.removeChild(toast);
    }, 3000);
  }

  async function addInBd(e) {
    e.preventDefault();
    if (
      namePerson === "" ||
      image === "" ||
      smallDescriptiopn === "" ||
      longDescription === ""
    ) {
      alert("Preencha todos os campos!!");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "honored"), {
        name: namePerson,
        image: image,
        smallDescriptiopn: smallDescriptiopn,
        longDescription: longDescription,
      });
      showToast("Novo Homenagiado adicionado a lista!");
      setNamePerson("");
      setImage("");
      setSmallDescriptiopn("");
      setLongDescription("");
    } catch (e) {
      showToast("Erro ao adiocnar!");
    }
  }

  return (
    <div>
      <div id="toastContainer"></div>
      <Navbar />
      <h1 className="inputsNewPerson">Adicione uma nova pessoa homeageada!</h1>
      <div>
        <form className="inputsNewPerson">
          <input
            type="text"
            className="individualInput"
            placeholder="Nome"
            value={namePerson}
            onChange={(e) => setNamePerson(e.target.value)}
          />
          <input
            type="url"
            className="individualInput"
            placeholder="Imagem"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="text"
            className="individualInput"
            placeholder="Breve Descrição"
            value={smallDescriptiopn}
            onChange={(e) => setSmallDescriptiopn(e.target.value)}
          />
          <input
            type="text"
            className="individualInput"
            placeholder="Descrição completa"
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
          />
          <button
            className="newFormBtn"
            onClick={(e) => {
              addInBd(e);
            }}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
