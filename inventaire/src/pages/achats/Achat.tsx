import React, { FunctionComponent, useState } from "react";
import { styled } from "styled-components";
import { Article } from "../../helpers/Types";
import localServices from "../../helpers/LocalService";
import { useAppContext } from "../../helpers/AppContext";
import AchatTab from "./achatTab";

type Props = {};
export const Cont = styled.div`
  display: flex;
  flex-direction: column;
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
    th {
      padding: 10px 20px;
    }
  }
  & table {
    margin-top: 100px;
  }

  & h1 {
    color: orange;
  }
  & input,
  button {
    width: 100px;
    height: 40px;
  }
`;

const Search = styled.div`
  & input {
    min-width: 40%;
    height: 40px;
    outline: solid 2px orange;
    border-radius: 15px;
    text-align: center;
  }
`;

const Achatpages: FunctionComponent<Props> = () => {
  const { articles, achats} = useAppContext();
  const [term, setTerm] = useState<string>("");
  const [a, setA] = useState<Article[]>([]);
  const [search, setSearch] = useState<boolean>(false);
  console.log("vos achats", achats);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);
    setSearch(true);

    if (term.length <= 1) {
      setA([]);
      setSearch(false);
      return;
    }
    setSearch(true);
    setA(
      localServices
        .searchArticle(term, articles)
        .sort((a, b) => a.nom.localeCompare(b.nom))
    );
    console.log(localServices.searchArticle(term, articles));
  };



  return (
    <Cont>
      <Acc>
        <div>
          <h1>Vous Pouvez enregistrer de nouveaux achats sous forme d'unité </h1>
          <Search>
            <input
              type="text"
              placeholder="Rechercher un article"
              value={term}
              onChange={(e) => handleInputChange(e)}
            />
            {search ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prix d'achat</th>
                    <th>Prix de vente</th>
                    <th>nombre d'achat</th>
                    <th>Valider</th>
                  </tr>
                </thead>
                <tbody>
                  {a.map((item) => (
                    <AchatTab key={item.id} item={item} />
                  ))}
                </tbody>
              </table>
            ) : (
              <></>
            )}
          </Search>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prix d'achat</th>
                <th>Prix de vente</th>
                <th>nombre d'article acheter</th>
                <th>Valider</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((item) => (
                <AchatTab key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </Acc>
    </Cont>
  );
};

export default Achatpages;
