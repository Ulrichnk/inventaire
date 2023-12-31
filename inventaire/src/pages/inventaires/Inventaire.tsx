import React, { FunctionComponent, useContext, useState } from "react";
import { styled } from "styled-components";
import { Article } from "../../helpers/Types";
import Inv from "../../components/Inv";
import { AppContext } from "../../App";
import localServices from "../../helpers/LocalService";
import { useAppContext } from "../../helpers/AppContext";
export const Cont = styled.div`
  display: flex;
  flex-direction: column;
`;
export type benef = {
  benefReel: number;
  id: number;
};
export type benefA = {
  benefAttendu: number;
  id: number;
};

const Search = styled.div`
  & input {
    min-width: 40%;
    height: 40px;
    outline: solid 2px orange;
    border-radius: 15px;
    text-align: center;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 120px auto;
  & table,
  td,
  th {
    outline: solid 1px black;
  }
  & th,
  & td {
    background-color: orange;
    color: white;
    padding: 10px 20px;
  }
  & h1 {
    color: orange;
  }
  & input {
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
  & table {
    margin-top: 30px;
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
};

const InventairePages: FunctionComponent<Props> = React.memo(() => {
  const [state, setState] = useState<boolean>(false);
  const contextValue = useContext(AppContext);
  const [id_historique, setId_historique] = useState<number>(0);
  const [term, setTerm] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const [a, setA] = useState<Article[]>([]);
  const { setHistoriques, articles, historiques } = useAppContext();
  const [tabBenef, setTabBenef] = useState<benef[]>(
    articles.map((art) => {
      return { id: art.id, benefReel: 0 };
    })
  );
  const [tabBenefAttendu, setTabBenefAttendu] = useState<benefA[]>(
    articles.map((art) => {
      return { benefAttendu: 0, id: art.id };
    })
  );
  // React.useEffect(() => {
  //   setTabBenef(
  //     articles.map((art) => {
  //       return { benef: 0, id: art.id, benefcalc: 0 };
  //     })
  //   );
  // }, []);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
    console.log(a);
  };

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
      console.log("histo", historiques);

      localServices
        .addHistorique(
          duree.date_debut.value,
          duree.date_fin.value,
          historiques,
          setHistoriques
        )
        .then((res) =>
          res
            ? (setId_historique(res.id),
              alert("historique ajoute avec succès veuillez continuez"))
            : alert("historique deja ajoutée")
        );
    }
  };
  console.log("evolution deu benef", tabBenef);

  return (
    <Container>
      <div>
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
            <Search>
              <input
                type="text"
                placeholder="Rechercher un article"
                value={term}
                onChange={(e) => handleInput(e)}
              />
              {search ? (
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
                      <th>stok vendu</th>
                      <th>Stock restant</th>
                      <th>Manque</th>
                      <th>Bénéfice attendu</th>
                      <th>Bénéfice réel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {change
                      ? a.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nom}</td>
                            <td>{item.prix_achat}</td>
                            <td>{item.prix_vente}</td>
                            <Inv
                              id={item.id}
                              state={state}
                              id_historique={id_historique}
                              benefs={tabBenef}
                              setBenef={setTabBenef}
                              benefAttendu={tabBenefAttendu}
                              setBenefAttendu={setTabBenefAttendu}
                            />
                          </tr>
                        ))
                      : a.map((item) => (
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
                              benefs={tabBenef}
                              setBenef={setTabBenef}
                              benefAttendu={tabBenefAttendu}
                              setBenefAttendu={setTabBenefAttendu}
                            />
                          </tr>
                        ))}
                  </tbody>
                </table>
              ) : (
                <></>
              )}
            </Search>
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
                <th>stok vendu</th>
                <th>Stock restant</th>
                <th>Manque</th>
                <th>Bénéfice attendu</th>
                <th>Bénéfice réel</th>
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
                        benefs={tabBenef}
                        setBenef={setTabBenef}
                        benefAttendu={tabBenefAttendu}
                        setBenefAttendu={setTabBenefAttendu}
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
                        benefs={tabBenef}
                        setBenef={setTabBenef}
                        benefAttendu={tabBenefAttendu}
                        setBenefAttendu={setTabBenefAttendu}
                      />
                    </tr>
                  ))}
            </tbody>
          </table>
          <button onClick={HandleSubmit}>Valider l'inventaire</button>
        </div>
      </div>
      <div>
        <button>
          benefice total reel obtenu avec le stock restant entrée :{" "}
          <h3>
            {" "}
            {tabBenef.reduce((somme, bene) => somme + bene.benefReel, 0)}
          </h3>
        </button>
        <button>
          benefice total attendu :{" "}
          <h3>
            {" "}
            {tabBenefAttendu.reduce(
              (somme, benef) => somme + benef.benefAttendu,
              0
            )}
          </h3>
        </button>
      </div>
    </Container>
  );
});

export default InventairePages;
