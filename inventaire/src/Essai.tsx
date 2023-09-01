import React, { FunctionComponent } from "react";
import InventaireFireService from "./helpers/InventaireFire";
import { Article } from "./helpers/Types";

type Props = {
  //define your props here
  articles: Article[];
};

const Essai: FunctionComponent<Props> = ({ articles }) => {
  const handles = async () => {
    const promises = articles.map(async (res) => {
      try {
        const result = await InventaireFireService.addInventaire(
          1,
          res.id,
          0,
          0,
          0
        );
        console.log("Inventaire 0 créé");
        return result;
      } catch (error) {
        console.error("Erreur lors de la création de l'inventaire : ", error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    console.log(results, "initialisés");
  };
  const handle = () => {
    console.log("il ne se passe rien");
  };
  return (
    <div >
      ici on teste les nouvelles options
      <button onClick={handle}>valider</button>
    </div>
  );
};

export default Essai;