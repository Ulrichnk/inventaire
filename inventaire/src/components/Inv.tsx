import React, { FunctionComponent, useEffect, useState } from "react";
import { Article, Historique, Inventaire } from "../helpers/Types";
import ArticleService from "../helpers/DbArticle";
import InventaireService from "../helpers/DbInventaire";
import InventaireFireService from "../helpers/InventaireFire";

type Field<T> = {
  value?: T;
  isValid?: boolean;
};
type Form = {
  id: Field<number>;
  stock_achat: Field<number>;
  stock_restant: Field<number>;
};
type Duree = {
  date_debut: Field<string>;
  date_fin: Field<string>;
};

type Props = {
  //define your props here
  id: number;
  duree?: Duree;
  state?: boolean;
};
const Inv: FunctionComponent<Props> = ({ id, duree, state }) => {
  const [article, setArticleState] = useState<Article>();
  const [stock, setStock] = useState<Inventaire>();
  const [stock_restant, setStockRestant] = useState<number>(0);
  const [stock_depart, setStockDepart] = useState<number>(0);
  const [stock_achat, setStockAchat] = useState<number>(0);
  const [historique, setHistorique] = useState<Historique>();

  useEffect(() => {
    if (state === true && duree?.date_debut.value && duree?.date_fin.value) {
      InventaireFireService.addInventaire(
        duree.date_debut.value,
        duree.date_fin.value,
        id,
        stock_achat,
        stock_restant,
        stock_depart
      );
    }
  }, [state]);

  const [Form, setForm] = useState<Form>({
    id: {
      isValid: true,
      value: 0,
    },
    stock_achat: {
      isValid: true,
      value: 0,
    },
    stock_restant: {
      isValid: true,
      value: 0,
    },
  });
  useEffect(() => {
    ArticleService.getArticle(id).then((a) => {
      if (a && a !== null) {
        setArticleState(a);
      } else {
        console.log("vous avez une erreur pour la recuperation d el'article");
      }
    });
    const fetch = async (duree: Duree) => {
      InventaireService.getHistorique(
        duree.date_debut.value ? duree.date_debut.value : "",
        duree.date_fin.value ? duree.date_fin.value : ""
      ).then((a) => {
        if (a && a !== null) {
          setHistorique(a);
          InventaireService.getInventaire(
            historique ? historique.id : 0,
            id
          ).then((a) => {
            if (a && a !== null) {
              setStock(a);
              setStockRestant(a.stock_restant);
              setStockDepart(a.stock_depart);
            } else {
              console.log(
                "vous avez une erreur pour la recuperation de l'inventaire"
              );
            }
          });
        } else {
          console.log("vous avez une erreur pour l'historique");
        }
      });
    };
    if (duree) {
      fetch(duree);
    } else {
      setStock(undefined);
    }
    // eslint-disable-next-line
  }, [duree]);

  console.log(duree);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    if (e.target.name === "nom") {
      const newField: Field<string> = {
        [fieldName]: { value: fieldValue, isValid: true },
      };
      console.log("vous avez selectionner", fieldName);

      setForm({ ...Form, ...newField });
    } else {
      const newField: Field<number> = {
        [fieldName]: { value: fieldValue, isvalid: true },
      };
      console.log("vous avez selectionner", fieldName);

      setForm({ ...Form, ...newField });
    }
  };
  return (
    <>
      <td> {stock ? stock_depart : "stock depart"} </td>
      <td>
        <input
          value={Form.stock_achat.value !== 0 ? Form.stock_achat.value : ""}
          name="stock_achat"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="stock acheter "
          type="text"
        />
      </td>
      <td>
        {stock && Form.stock_achat.value
          ? (-Form.stock_achat.value - stock_depart) * -1
          : "stock total"}{" "}
      </td>
      <td>
        {article &&
        article.prix_achat !== undefined &&
        Form.stock_achat.value !== undefined
          ? article.prix_achat * Form.stock_achat.value
          : "valeur stock acheter"}
      </td>
      <td>
        {stock && article
          ? stock_depart * article.prix_achat
          : "valeur stock depart"}{" "}
      </td>
      <td>
        {stock && Form.stock_achat.value && article
          ? (-stock_depart - Form.stock_achat.value) * -1 * article.prix_achat
          : "valeur stock total"}{" "}
      </td>
      <td>
        <input
          value={Form.stock_restant.value !== 0 ? Form.stock_restant.value : ""}
          name="stock_restant"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="stock restant "
          type="text"
        />
      </td>
      <td>
        {article &&
        article.prix_vente !== undefined &&
        Form.stock_restant.value !== undefined
          ? article.prix_vente * Form.stock_restant.value
          : "valeur stock restant"}
      </td>
      <td>
        {article &&
        article.prix_vente !== undefined &&
        article.prix_achat !== undefined &&
        Form.stock_achat.value !== undefined &&
        Form.stock_restant.value !== undefined
          ? article.prix_vente *
              (Form.stock_achat.value - Form.stock_restant.value) -
            article.prix_achat * Form.stock_achat.value
          : "Bénéfice"}
      </td>
    </>
  );
};

export default Inv;
