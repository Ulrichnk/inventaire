import React, { FunctionComponent, useEffect } from "react";
import InventaireService from "../../helpers/DbInventaire";

type Props = {
  //define your props here
};

const Essai: FunctionComponent<Props> = () => {
  useEffect(() => {
    InventaireService.getInventaire(0, 1).then((res) => console.log(res));
  }, []);

  return <div>essai</div>;
};

export default Essai;
