import React, { FunctionComponent, useContext, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Article, User } from "../helpers/Types";
import { styled } from "styled-components";
import AjoutArticle from "./AjoutArticle";
import { AppContext } from "../App";
import ArticleFireService from "../helpers/ArticleFire";

type Props = {
  //define your props here
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
  setUserIslogged: Dispatch<SetStateAction<boolean>>;
};
const Cont = styled.div`
  display: flex;
  flex-direction: rows;
  & .n {
    margin-top: 150px;
  }
`;

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
    th ,button{
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

const Gestion: FunctionComponent<Props> = ({
  user,
  setUser,
  setUserIslogged,
}) => {
  const [term, setTerm] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const contextValue = useContext(AppContext);
  // const style: CSSProperties = { textDecoration: "none" };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);

    if (term.length <= 1) {
      setArticles([]);
      return;
    }
    setSearch(true);
    ArticleFireService.searchArticle(term).then((articles) => {
      setArticles(articles);
      console.log(articles);
    });
  };

  return (
    <Cont>
      <Acc>
        <h1>Supprimer un article</h1>
        <Search>
          <input
            type="text"
            placeholder="Rechercher un article"
            value={term}
            onChange={(e) => handleInputChange(e)}
          />
        </Search>
        <div>
          <br />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prix d'achat</th>
                <th>Prix de vente</th>
                <th>Suppression</th>
              </tr>
            </thead>
            <tbody>
              {search
                ? articles.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nom}</td>
                      <td>{item.prix_achat}</td>
                      <td>{item.prix_vente}</td>
                      <td>
                        <button>X</button>
                      </td>
                    </tr>
                  ))
                : contextValue?.articles.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nom}</td>
                      <td>{item.prix_achat}</td>
                      <td>{item.prix_vente}</td>
                      <td>
                        <button>X</button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </Acc>
      <div className="n">
        <AjoutArticle />
      </div>
    </Cont>
  );
};

export default Gestion;
