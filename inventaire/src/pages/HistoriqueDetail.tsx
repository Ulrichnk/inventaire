import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import Doc from "./Doc";

type Params = {
  //define your props herec
  id: string;
};
type Props = {};

const HistoriqueDetail: FunctionComponent<Props> = () => {
  const { id } = useParams<Params>();
  const id_hist = parseInt(id ? id : "0", 10);

  return (
    <div>
      detail de l'historique {id}
      <Doc id_hist={id_hist} />
    </div>
  );
};

export default HistoriqueDetail;
