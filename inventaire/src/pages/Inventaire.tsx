import React, { FunctionComponent, useState } from "react";
import { styled } from "styled-components";
import { Article, User } from "../helpers/Types";
import { Dispatch, SetStateAction } from "react";
import ArticleService from "../helpers/DbArticle";
import Inv from "../components/Inv";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  & tr,
  th,
  table,
  td,
  input {
    min-width: 200px;
    min-height: 40px;
  }
  & input {
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

type Props = {
  //define your props here
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
  setUserIslogged: Dispatch<SetStateAction<boolean>>;
};

const Inventaire: FunctionComponent<Props> = ({
  user,
  setUser,
  setUserIslogged,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [nb, setNb] = useState<number>();
  
  ArticleService.getArticles().then((articles) => setArticles(articles));
  const [Form] = useState<Form>({
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
    console.log("inventaire enregistrer");
  };
  return (
    <Container>
      <div>
        <h1>Faire un inventaire</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prix d'achat</th>
              <th>Prix de vente</th>
              <th>Stock de départ</th>
              <th>Stock acheter</th>
              <th>Valeur stock acheter</th>
              <th>Stock restant</th>
              <th>Bénéfice attendu</th>
            </tr>
          </thead>
          <tbody>
            {/* <Input Form={Form} setForm={setForm} /> */}
            {articles.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nom}</td>
                <td>{item.prix_achat}</td>
                <td>{item.prix_vente}</td>
                <Inv id={item.id || 0} />
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={HandleSubmit}>Valider l'inventaire</button>
      </div>
    </Container>
  );
};

export default Inventaire;
