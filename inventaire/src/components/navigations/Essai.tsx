import React, { FunctionComponent, useEffect } from "react";
import InventaireService from "../../helpers/DbInventaire";
import AjoutArticle from "../../pages/AjoutArticle";

type Props = {
  //define your props here
};

const Essai: FunctionComponent<Props> = () => {
  useEffect(() => {
    InventaireService.getInventaire(0, 1).then((res) => console.log(res));
  }, []);

  return <div>ici on teste les nouvelles options</div>;
};

export default Essai;
