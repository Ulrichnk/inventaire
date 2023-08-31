import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { styled } from "styled-components";
import { Achat, Article } from "../helpers/Types";
import localServices from "../helpers/LocalService";

type Props = {
  achats: Achat[];
  setAchats: Dispatch<SetStateAction<Achat[]>>;

  //define your props here
  articles: Article[];
  setArticles: Dispatch<SetStateAction<Article[]>>;
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

const Achatpages: FunctionComponent<Props> = ({ articles, setArticles }) => {
  const [term, setTerm] = useState<string>("");
  const [a, setA] = useState<Article[]>([]);
  const [search, setSearch] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);
    articles.sort((a, b) => a.nom.localeCompare(b.nom));
    a.sort((a, b) => a.nom.localeCompare(b.nom));

    if (term.length <= 1) {
      setA([]);
      setSearch(false);
      return;
    }
    setSearch(true);
    setA(localServices.searchArticle(term, articles));
    console.log(articles);
    
  };

  const handle = () => {
    console.log("achat enreistrer");
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
          <h1>Vous Pouvez enregistrer de nouvelles ventes </h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prix d'achat</th>
                <th>Prix de vente</th>
                <th>Valeur de l'achat</th>
              </tr>
            </thead>
            <tbody>
              {search
                ? a.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nom}</td>
                      <td>{item.prix_achat}</td>
                      <td>{item.prix_vente}</td>
                      <td>
                        <input
                          name="valeur_achat"
                          className="input"
                          placeholder="valeur de l'achat "
                          type="text"
                        />
                      </td>
                    </tr>
                  ))
                : articles.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nom}</td>
                      <td>{item.prix_achat}</td>
                      <td>{item.prix_vente}</td>
                      <td>
                        <input
                          name="valeur_achat"
                          className="input"
                          placeholder="valeur de l'achat "
                          type="text"
                        />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => handle()}>Valider les ventes</button>
      </Acc>
    </>
  );
};

export default Achatpages;
