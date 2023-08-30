import React, { FunctionComponent, useEffect, useState } from "react";
import ArticleFireService from "../helpers/ArticleFire";
import { styled } from "styled-components";
import { Article } from "../helpers/Types";
import Inve from "../components/Inve";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 150px;
  min-height: 100vh;
  min-width: 100vw;

  & table,
  td,
  th {
    outline: solid 1px black;
  }

  & table {
    min-width: 700px;
    margin: 0 auto;
    & th,
    & td {
      background-color: orange;
      color: white;
    }
    & td,
    th {
      padding: 10px 20px;
    }
  }
  & h1 {
    color: orange;
  }
  & tr,
  th,
  table,
  td,
  input {
    min-width: 40px;
    min-height: 40px;
  }

  @media (max-width: 768px) {
    & table {
      min-width: 300px;
    }
  }
  & input {
    font-size: 1em;
    border: none;
    outline: none;
  }

  & button {
    min-width: 140px;
    height: 40px;
    margin: 20px;
  }
`;

type Props = {
  //define your props here

  id_hist: number;
};

const Doc: FunctionComponent<Props> = ({ id_hist }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    ArticleFireService.getArticles().then((articles) => setArticles(articles));
  }, []);

  return (
    <Container>
      <div>
        <h1>Voici votre inventaire Monsieur </h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prix d'achat</th>
              <th>Prix de vente</th>
              <th>Stock de départ</th>
              <th>Stock acheter</th>
              <th>Stock total</th>
              <th>Valeur stock acheter</th>
              <th>Valeur stock départ</th>
              <th>Valeur stock total</th>
              <th>Stock restant</th>
              <th>Valeur stock restant</th>
              <th>Bénéfice attendu</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nom}</td>
                <td>{item.prix_achat}</td>
                <td>{item.prix_vente}</td>
                <Inve id={item.id} id_hist={id_hist} />
              </tr>
            ))}
          </tbody>
        </table>
        <button>Votre inventaire</button>
      </div>
    </Container>
  );
};
export default Doc;
