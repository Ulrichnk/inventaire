import React, { FunctionComponent, useState } from "react";
import { Article } from "../helpers/Types";
import ArticleService from "../helpers/DbArticle";
import { styled } from "styled-components";
import Input from "../components/Input";

type Props = {
  //define your props here
};
type Field<T> = {
  value?: T;
  isValid?: boolean;
};
type Form = {
  nom: Field<string>;
  prix_achat: Field<number>;
  prix_vente: Field<number>;
  id: Field<number>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  & tr,
  th,
  table,
  td,
  .input {
    min-width: 500px;
    min-height: 50px;
  }
  & .input {
    font-size: 1.5em;
    border: none;
    outline: none;
  }
  & table,
  td,
  th {
    outline: solid 1px black;
  }
  & button {
    min-width: 140px;
    height: 40px;
    margin: 20px;
  }
`;

const AjoutArticle: FunctionComponent<Props> = () => {
  const [Form, setForm] = useState<Form>({
    nom: {
      isValid: true,
      value: "",
    },
    prix_achat: {
      isValid: true,
      value: 0,
    },
    prix_vente: {
      isValid: true,
      value: 0,
    },
    id: {
      isValid: true,
      value: 0,
    },
  });
 
  const HandleSubmit = () => {
    console.log(Form);
    console.log("article enregistrer");
    if (
      Form.nom.value &&
      Form.prix_achat.value &&
      Form.prix_vente.value &&
      Form.nom.value !== "" &&
      Form.prix_achat.value !== 0 &&
      Form.prix_vente.value !== 0
    ) {
      const a: Article = {
        id: 0,
        nom: Form.nom.value,
        prix_achat: Form.prix_achat.value,
        prix_vente: Form.prix_vente.value,
        created_at: new Date(),
      };
      ArticleService.addArticle(a);
    } else {
      alert("veuillez remplir tous les champs !");
    }
  };

  return (
    <Container>
      <div>
        <h1>Ajouter un article</h1>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix d'achat</th>
              <th>Prix de vente</th>
            </tr>
          </thead>
          <tbody>
            <Input Form={Form} setForm={setForm} />
          </tbody>
        </table>
        <button onClick={HandleSubmit}>Valider l'ajout</button>
      </div>
    </Container>
  );
};

export default AjoutArticle;
