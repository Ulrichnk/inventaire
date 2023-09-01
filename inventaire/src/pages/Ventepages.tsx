import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { styled } from "styled-components";
import { Vente, Article, formatDate } from "../helpers/Types";
import localServices from "../helpers/LocalService";

type Props = {
  ventes: Vente[];
  setVentes: Dispatch<SetStateAction<Vente[]>>;

  //define your props here
  articles: Article[];
  setArticles: Dispatch<SetStateAction<Article[]>>;
};
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

const Ventepages: FunctionComponent<Props> = ({
  articles,
  setArticles,
  ventes,
  setVentes,
}) => {
  const [term, setTerm] = useState<string>("");
  const [a, setA] = useState<Article[]>([]);
  const [search, setSearch] = useState<boolean>(false);
  const [vente, setVente] = useState<number[]>(Array(articles.length).fill(0));

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

  const handle = (id: number) => {
    console.log("vente enregistrer");
    localServices
      .addVente(id, vente[id], formatDate(new Date()), setVentes)
      .then((res) => {
        if (res) {
          console.log("vous avez reussi a enregistrer", res);
        } else {
          console.log("echec");
        }
      });
  };

  return (
    <Cont>
      <Acc>
        <div>
          <h1>Vous Pouvez enregistrer de nouvelles ventes </h1>
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
                    <th>Prix d'vente</th>
                    <th>Prix de vente</th>
                    <th>Valeur de l'vente</th>
                    <th>Valider</th>
                  </tr>
                </thead>
                <tbody>
                  {a.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nom}</td>
                      <td>{item.prix_vente}</td>
                      <td>{item.prix_vente}</td>
                      <td>
                        <input
                          value={vente[item.id]}
                          name="valeur_vente"
                          className="input"
                          placeholder="valeur de l'vente "
                          type="text"
                          style={{ width: "100px" }}
                          onChange={(e) => {
                            const newValue = parseFloat(e.target.value);
                            // Mettre à jour le tableau vente avec la nouvelle valeur
                            setVente((prevVente) => ({
                              ...prevVente,
                              [item.id]: isNaN(newValue) ? 0 : newValue, // Assurez-vous que c'est un nombre ou 0 par défaut
                            }));
                          }}
                        />
                      </td>
                      <td>
                        <button onClick={() => handle(item.id)}>
                          Valider les ventes
                        </button>
                      </td>
                    </tr>
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
                <th>Prix d'vente</th>
                <th>Prix de vente</th>
                <th>Valeur de l'vente</th>
                <th>Valider</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nom}</td>
                  <td>{item.prix_vente}</td>
                  <td>{item.prix_vente}</td>
                  <td>
                    <input
                      value={vente[item.id]}
                      name="valeur_vente"
                      className="input"
                      placeholder="valeur de l'vente "
                      type="text"
                      onChange={(e) => {
                        const newValue = parseFloat(e.target.value);
                        // Mettre à jour le tableau vente avec la nouvelle valeur
                        setVente((prevVente) => ({
                          ...prevVente,
                          [item.id]: isNaN(newValue) ? 0 : newValue, // Assurez-vous que c'est un nombre ou 0 par défaut
                        }));
                      }}
                    />
                  </td>
                  <td>
                    <button onClick={() => handle(item.id)}>
                      Valider les ventes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Acc>
    </Cont>
  );
};

export default Ventepages;
