import React, { FunctionComponent, useState } from "react";
import { Article } from "../helpers/Types";
import ArticleService from "../helpers/DbArticle";

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
  id: number;
};
const Inv: FunctionComponent<Props> = ({ id }) => {
  const [article, setArticleState] = useState<Article>();
  ArticleService.getArticle(id).then((a) => {
    if (a && a !== null) {
      setArticleState(a);
    } else {
      console.log("vous avez une erreur");
    }
  });

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
      <td> stock de départ </td>
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
      <td>stock total</td>
      <td>
        {article &&
        article.prix_achat !== undefined &&
        Form.stock_achat.value !== undefined
          ? article.prix_achat * Form.stock_achat.value
          : "valeur stock acheter"}
      </td>
      <td>valeur stock de départ </td>
      <td>valeur stock total </td>
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
