import React, { FunctionComponent, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Article } from "../helpers/Types";
import ArticleService, { useArticle } from "../helpers/DbArticle";

type Field<T> = {
  value?: T;
  isValid?: boolean;
};
type Form = {
  //   nom: Field<string>;
  //   prix_achat: Field<number>;
  //   prix_vente: Field<number>;
  id: Field<number>;
  stock_achat: Field<number>;
  stock_restant: Field<number>;
};

type Props = {
  //define your props here
  Form: Form;
  setForm: Dispatch<SetStateAction<Form>>;
  id: number;
};
const Inv: FunctionComponent<Props> = ({ Form, setForm, id }) => {
  const Article = useArticle;
  const article = Article.find((a) => id === a.id);

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
      <td>
        <input
          value={Form.nom.value}
          name="nom"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="nom article"
          type="text"
        />
      </td>
      <td>
        <input
          value={Form.prix_achat.value !== 0 ? Form.prix_achat.value : ""}
          name="prix_achat"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="prix d'achat"
          type="text"
        />
      </td>
      <td>
        <input
          value={Form.prix_vente.value !== 0 ? Form.prix_vente.value : ""}
          name="prix_vente"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="prix de vente"
          type="text"
        />
      </td>
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
        article.prix_achat !== undefined &&
        Form.stock_achat.value !== undefined &&
        Form.stock_restant.value !== undefined
          ? article.prix_vente *
              (Form.stock_restant.value - Form.stock_achat.value) -
            article.prix_achat * Form.stock_achat.value
          : "Bénéfice"}
      </td>
    </>
  );
};

export default Inv;
