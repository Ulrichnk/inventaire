import React, { FunctionComponent, useEffect } from "react";
import InventaireService from "../../helpers/DbInventaire";

type Props = {
  //define your props here
};

const Essai: FunctionComponent<Props> = () => {
  const fetchdata = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL1}/inventaire`)
      .then((response) => response.json())
      .then((response) => console.log("votre: ", response))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    InventaireService.getInventaire(0,1).then((res) => console.log(res));
  }, []);

  return <div>essai</div>;
};

export default Essai;
