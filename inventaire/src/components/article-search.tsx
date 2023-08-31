import React, { FunctionComponent, useState } from "react";
import { Article } from "../helpers/Types";
import { styled } from "styled-components";
import localServices from "../helpers/LocalService";

type Props = {
  //define your props here
};
const Acc = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 150px;
  min-height: 100vh;
  & table,
  td,
  th {
    outline: solid 1px black;
  }
  & table {
    min-width: 700px;
    margin: 0 auto;
    border-collapse: collapse;
    border-spacing: 0;
    & th,
    & td {
      background-color: orange;
      color: white;
    }
    & th {
      padding: 12px 15px;
    }
    & td {
      padding: 10px 20px;
    }
    & tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    & td,
    th {
      padding: 10px 20px;
    }
  }

  & h1 {
    color: orange;
  }
`;

const Search = styled.div`
  & input {
    width: 40%;
    height: 40px;
    outline: solid 2px orange;
    border-radius: 15px;
    text-align: center;
  }
`;

const ArticleSearch: FunctionComponent<Props> = () => {
  const [term, setTerm] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  // const style: CSSProperties = { textDecoration: "none" };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);

    if (term.length <= 1) {
      setArticles([]);
      return;
    }
    setArticles(localServices.searchArticle(term, articles));
    console.log(articles);
  };

  return (
    <>
      <Acc>
        <Search>
          <input
            type="text"
            placeholder="Rechercher un article"
            value={term}
            onChange={(e) => handleInputChange(e)}
          />
        </Search>
        <div>
          <h1>Tableau de données</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prix d'achat</th>
                <th>Prix de vente</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nom}</td>
                  <td>{item.prix_achat}</td>
                  <td>{item.prix_vente}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Acc>
    </>
  );
};

export default ArticleSearch;
