import React, { FunctionComponent, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { Article } from "../../helpers/Types";
import { benef, benefA } from "./Inventaire";
import { useAppContext } from "../../helpers/AppContext";
import localServices from "../../helpers/LocalService";
import InvTmp from "./invtmp";
type Field<T> = {
  value?: T;
  isValid?: boolean;
};

type Duree = {
  date_debut: Field<string>;
  date_fin: Field<string>;
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
type Props = {
  //define your props here
};
type Params = {
  //define your props herec
  id: string;
  date_fin: string;
};
const InventaireTemporaire: FunctionComponent<Props> = () => {
  const { id, date_fin } = useParams<Params>();
  let navigate = useNavigate();
  const id_hist = parseInt(id ? id : "1");
  const [state, setState] = useState<boolean>(false);
  const [term, setTerm] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const [a, setA] = useState<Article[]>([]);
  const { setHistoriques, articles, historiques } = useAppContext();
  const [change, setChange] = useState<boolean>(true);
  const hist = localServices.getHistoriqueById(id_hist - 1, historiques);
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

  const [duree] = useState<Duree>({
    date_debut: {
      isValid: true,
      value: hist?.date_fin,
    },
    date_fin: {
      isValid: true,
      value: date_fin,
    },
  });

  const HandleSubmit = () => {
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
            ? (
              console.log("historique ajoute avec succès veuillez continuez"))
            :console.log("historique deja ajoutée")
        );
    }
    setState(true);
    setTimeout(() => {
      navigate("/historiques");
    }, 1000);
  };
  return hist && date_fin && id ? (
    <Container>
      <div>
        <div>
          <h1>Faire un inventaire Monsieur </h1>

          <div className="date">
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
                            <InvTmp
                              id={item.id}
                              state={state}
                              id_historique={id_hist}
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
                            <InvTmp
                              id={item.id}
                              duree={duree}
                              state={state}
                              id_historique={id_hist}
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
              {articles.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nom}</td>
                  <td>{item.prix_achat}</td>
                  <td>{item.prix_vente}</td>
                  <InvTmp
                    id={item.id}
                    duree={duree}
                    state={state}
                    id_historique={id_hist}
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
  ) : (
    <>loading...</>
  );
};

export default InventaireTemporaire;
