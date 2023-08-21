import React, { CSSProperties, FunctionComponent, useState } from "react";
import { Article } from "../helpers/Types";
import ArticleService, { useArticle } from "../helpers/DbArticle";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

type Props = {
  //define your props here
};
const Acc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  & table,
  td,
  th {
    outline: solid 1px black;
  }
  & table {
    min-width: 700px;
  }
  & h1 {
    color: red;
  }
`;

const Search = styled.div`
  display: flex;
  flex-direction: row;

  & input {
    width: 200px;
    height: 40px;
    outline: solid 2px red;
    border-radius: 15px;
  }
  & .der {
    background-color: white;
    border-radius: 15px;
    text-decoration: none;
  }
`;

const ArticleSearch: FunctionComponent<Props> = () => {
  const [term, setTerm] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const style: CSSProperties = { textDecoration: "none" };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);

    if (term.length <= 1) {
      setArticles([]);
      return;
    }

    ArticleService.searchArticle(term).then((articles) => {
      setArticles(articles);
      console.log(articles);
    });
  };

  return (
    <>
      <Acc>
        <Search>
          <div>
            <input
              type="text"
              placeholder="Rechercher un article"
              value={term}
              onChange={(e) => handleInputChange(e)}
            />
            {/* <div className="der">
              {articles.map((article) => (
                <NavLink
                  key={article.id}
                  to={`/articles/${article.id}`}
                  className={(nav) =>
                    nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
                  }
                  style={style}
                >
                  {article.nom}
                </NavLink>
              ))}
            </div> */}
          </div>
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
