import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import Doc from "./Doc";
import { Article, Historique, Inventaire } from "../helpers/Types";

type Params = {
  //define your props herec
  id: string;
};
type Props = {
  articles: Article[];
  setArticles: Dispatch<SetStateAction<Article[]>>;
  inventaires: Inventaire[];
  setInventaires: Dispatch<SetStateAction<Inventaire[]>>;
  historiques: Historique[];
  setHistoriques: Dispatch<SetStateAction<Historique[]>>;
};

const HistoriqueDetail: FunctionComponent<Props> = ({
  articles,
  setArticles,
  setInventaires,
  inventaires,
  historiques,
  setHistoriques,
}) => {
  const { id } = useParams<Params>();
  const id_hist = parseInt(id ? id : "1", 10);

  return (
    <>
      detail de l'historique {id}
      <Doc
        id_hist={id_hist}
        articles={articles}
        setArticles={setArticles}
        inventaires={inventaires}
        setInventaires={setInventaires}
        historiques={historiques}
        setHistoriques={setHistoriques}
      />
    </>
  );
};

export default HistoriqueDetail;
