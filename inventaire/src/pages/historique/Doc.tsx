import React, { FunctionComponent, useState } from "react";
import { styled } from "styled-components";
import Inve from "../../components/Inve";
import { useAppContext } from "../../helpers/AppContext";
import { benef, benefA } from "../inventaires/Inventaire";

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
  const { articles } = useAppContext();
  const [s, sets] = useState<boolean>(true);
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

  const handle = () => {
    setTimeout(() => {
      sets(!s);
    }, 1);
  };
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
              <th>stok vendu</th>
              <th>Stock restant</th>
              <th>Manque</th>
              <th>Bénéfice attendu</th>
              <th>Bénéfice réel</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nom}</td>
                <td>{item.prix_achat}</td>
                <td>{item.prix_vente}</td>
                <Inve
                  id_hist={id_hist}
                  benefs={tabBenef}
                  setBenef={setTabBenef}
                  benefAttendu={tabBenefAttendu}
                  setBenefAttendu={setTabBenefAttendu}
                  article={item}
                  s={s}
                />
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={()=>handle()}>Votre inventaire</button>
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
};
export default Doc;
