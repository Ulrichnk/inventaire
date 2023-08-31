import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Article, Historique, Inventaire } from "../helpers/Types";
import localServices from "../helpers/LocalService";

type Props = {
  //define your props here
  id: number;
  id_hist: number;
  articles: Article[];
  setArticles: Dispatch<SetStateAction<Article[]>>;
  inventaires: Inventaire[];
  setInventaires: Dispatch<SetStateAction<Inventaire[]>>;
  historiques: Historique[];
  setHistoriques: Dispatch<SetStateAction<Historique[]>>;
};
const Inve: FunctionComponent<Props> = ({
  id,
  id_hist,
  articles,
  setArticles,
  setInventaires,
  inventaires,
  historiques,
  setHistoriques,
}) => {
  const [article, setArticleState] = useState<Article>();
  const [stock, setStock] = useState<Inventaire>();

  useEffect(() => {
    const a=localServices.getArticle(id,articles)
      if (a && a !== null) {
        setArticleState(a);
      } else {
        console.log("vous avez une erreur pour la recuperation d el'article");
      }
    

    const fetch = async (id_hist: number) => {
      localServices.getInventaire(id_hist, id,inventaires).then((a) => {
        if (a && a !== null) {
          setStock(a);
        } else {
          console.log(
            "vous avez une erreur pour la recuperation de l'inventaire"
          );
        }
      });
    };
    fetch(id_hist);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <td> {stock ? stock.stock_depart : "stock depart"} </td>
      <td>{stock ? stock.stock_achat : "stock_acheter"}</td>
      <td>
        {stock ? (-stock.stock_achat - stock.stock_depart) * -1 : "stock total"}{" "}
      </td>
      <td>
        {article && stock && article.prix_achat !== undefined
          ? article.prix_achat * stock.stock_achat
          : "valeur stock acheter"}
      </td>
      <td>
        {stock && article
          ? stock.stock_depart * article.prix_achat
          : "valeur stock depart"}{" "}
      </td>
      <td>
        {stock && article
          ? (-stock.stock_depart - stock.stock_achat) * -1 * article.prix_achat
          : "valeur stock total"}{" "}
      </td>
      <td>{stock ? stock.stock_restant : "stock restant"}</td>
      <td>
        {article && stock && article.prix_vente !== undefined
          ? article.prix_achat * stock.stock_restant
          : "valeur stock restant"}
      </td>
      <td>
        {article &&
        stock &&
        article.prix_vente !== undefined &&
        article.prix_achat !== undefined
          ? (-stock.stock_depart - stock.stock_achat) *
              -1 *
              article.prix_achat -
            article.prix_achat * stock.stock_restant
          : "Bénéfice"}
      </td>
    </>
  );
};

export default Inve;
