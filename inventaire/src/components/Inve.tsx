import React, { FunctionComponent, useEffect, useState } from "react";
import { Article, Inventaire } from "../helpers/Types";
import InventaireFireService from "../helpers/InventaireFire";
import ArticleFireService from "../helpers/ArticleFire";




type Props = {
  //define your props here
  id: number;
  id_hist: number;
};
const Inve: FunctionComponent<Props> = ({ id, id_hist }) => {
  const [article, setArticleState] = useState<Article>();
  const [stock, setStock] = useState<Inventaire>();

  useEffect(() => {
    ArticleFireService.getArticle(id).then((a) => {
      if (a && a !== null) {
        setArticleState(a);
      } else {
        console.log("vous avez une erreur pour la recuperation d el'article");
      }
    });

    const fetch = async (id_hist: number) => {
      InventaireFireService.getInventaire(id_hist, id).then((a) => {
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
          ? article.prix_vente * stock.stock_restant
          : "valeur stock restant"}
      </td>
      <td>
        {article &&
        stock &&
        article.prix_vente !== undefined &&
        article.prix_achat !== undefined
          ? article.prix_vente * (stock.stock_achat - stock.stock_restant) -
            article.prix_achat * stock.stock_achat
          : "Bénéfice"}
      </td>
    </>
  );
};

export default Inve;
