import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { styled } from "styled-components";
import { Article, User } from "../helpers/Types";
import { Dispatch, SetStateAction } from "react";
import Inv from "../components/Inv";
import { AppContext } from "../App";
import ArticleFireService from "../helpers/ArticleFire";
import InventaireFireService from "../helpers/InventaireFire";
export const Container = styled.div`
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
type Field<T> = {
  value?: T;
  isValid?: boolean;
};

type Duree = {
  date_debut: Field<string>;
  date_fin: Field<string>;
};

type Props = {
  //define your props here
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
  setUserIslogged: Dispatch<SetStateAction<boolean>>;
  articles: Article[];
  setArticles: Dispatch<SetStateAction<Article[]>>;
  id_hist?: number;
};

const Inventaire: FunctionComponent<Props> = ({
  user,
  setUser,
  setUserIslogged,
  articles,
  setArticles,
  id_hist,
}) => {
  const [state, setState] = useState<boolean>(false);
  const contextValue = useContext(AppContext);
  const [id_historique, setId_historique] = useState<number>(0);

  useEffect(() => {
    ArticleFireService.getArticles().then((articles) => setArticles(articles));
  }, [setArticles]);

  const [duree, setDuree] = useState<Duree>({
    date_debut: {
      isValid: true,
      value: "",
    },
    date_fin: {
      isValid: true,
      value: "",
    },
  });
  const [change, setChange] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChange(true);
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field<string> = {
      [fieldName]: { value: fieldValue, isValid: true },
    };
    console.log(
      "vous avez selectionner",
      fieldName,
      " de valeur : ",
      fieldValue,
      "et de type",
      typeof fieldValue
    );

    setDuree({ ...duree, ...newField });
  };

  const HandleSubmit = () => {
    setState(true);
  };

  const addHist = () => {
    if (duree.date_debut.value && duree.date_fin.value) {
      setChange(false);
      InventaireFireService.addHistorique(
        duree.date_debut.value,
        duree.date_fin.value
      ).then((res) => (res ? setId_historique(res.id) : "erreur"));
    }
  };

  return (
    <Container>
      <div>
        <h1>
          Faire un inventaire Monsieur{" "}
          {contextValue ? contextValue.user.name : ""}
        </h1>
        <div className="date">
          <p>Selectionner la date de vos comptes</p>
          <label htmlFor="date_debut">date de début:</label>
          <input
            value={duree.date_debut.value}
            name="date_debut"
            onChange={(e) => handleInputChange(e)}
            className="date-input "
            placeholder="date de debut "
            type="date"
          />
          <label htmlFor="date_fin">date de fin:</label>
          <input
            value={duree.date_fin.value}
            name="date_fin"
            onChange={(e) => handleInputChange(e)}
            className="date-input"
            placeholder="date de debut "
            type="date"
          />
          <button
            onClick={() => {
              addHist();
            }}
          >
            Valider
          </button>
        </div>
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
            {/* <Input Form={Form} setForm={setForm} /> */}

            {change
              ? articles.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nom}</td>
                    <td>{item.prix_achat}</td>
                    <td>{item.prix_vente}</td>
                    <Inv
                      id={item.id}
                      state={state}
                      id_historique={id_historique}
                    />
                  </tr>
                ))
              : articles.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nom}</td>
                    <td>{item.prix_achat}</td>
                    <td>{item.prix_vente}</td>
                    <Inv
                      id={item.id}
                      duree={duree}
                      state={state}
                      id_historique={id_historique}
                    />
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
