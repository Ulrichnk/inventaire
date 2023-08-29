import React, { FunctionComponent, useEffect, useState } from "react";
import { Article, Inventaire } from "../helpers/Types";
import InventaireFireService from "../helpers/InventaireFire";
import ArticleFireService from "../helpers/ArticleFire";

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
  const [article, setArticle] = useState<Article>();
  const [stock_depart, setStockDepart] = useState<number>(0);

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
    ArticleFireService.getArticle(id).then((a) => {
      if (a && a !== null) {
        setArticle(a);
        console.log(
          "vous avez reussi la recuperation de l'article dont l'id est",
          id
        );
      } else {
        console.log(
          "vous avez une erreur pour la recuperation de l'article dont l'id est",
          id
        );
      }
    });
  }, [id]);

  useEffect(() => {
    const fetch = async (duree: Duree) => {
      InventaireFireService.getHistorique1(
        duree.date_debut.value ? duree.date_debut.value : ""
      ).then((a) => {
        if (a && a !== null) {
          console.log(a);

          InventaireFireService.getInventaire(a.id, id).then((a) => {
            if (a && a !== null) {
              setStockDepart(a.stock_restant);
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
    }
    // eslint-disable-next-line
  }, [duree]);

  useEffect(() => {
    console.log("votre state ", state);

    if (
      state &&
      duree?.date_debut.value &&
      duree?.date_fin.value &&
      Form.stock_achat.value &&
      Form.stock_restant.value 
      
    ) {
      InventaireFireService.addInventaire(
        duree.date_debut.value,
        duree.date_fin.value,
        id,
        Form.stock_achat.value as number,
        Form.stock_restant.value,
        stock_depart as number
      ).then((inve) => {
        console.log("inventaire enregistrer");
        console.log(inve);
        setForm({
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
      });
    }else{
      console.log('erreur lors de l envoi');
      
    }
  }, [state]);

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
      <td> {stock_depart} </td>
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
        {Form.stock_achat.value
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
        {article ? stock_depart * article.prix_achat : "valeur stock depart"}{" "}
      </td>
      <td>
        {Form.stock_achat.value && article
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
          ? article.prix_achat * Form.stock_restant.value
          : "valeur stock restant"}
      </td>
      <td>
        {article &&
        article.prix_vente !== undefined &&
        article.prix_achat !== undefined &&
        Form.stock_achat.value !== undefined &&
        Form.stock_restant.value !== undefined
          ? (-stock_depart - Form.stock_achat.value) * -1 * article.prix_achat -
            article.prix_achat * Form.stock_restant.value
          : "Bénéfice atttendu"}
      </td>
    </>
  );
};

export default Inv;
