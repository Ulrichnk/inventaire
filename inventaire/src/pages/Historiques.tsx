import React, { FunctionComponent, useState } from "react";
import InventaireFireService from "../helpers/InventaireFire";
import { Historique } from "../helpers/Types";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

type Props = {
  //define your props herec
};
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

const Historiques: FunctionComponent<Props> = () => {
  const [historiques, setHistoriques] = useState<Historique[]>([]);
  let navigate = useNavigate();

  InventaireFireService.getHistoriques().then((res) => {
    setHistoriques(res);
  });
  const handle = (id: number) => {
    navigate(`/historiques/${id}`);
  };

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>date de début </th>
            <th>date de fin </th>
            <th>detail</th>
          </tr>
        </thead>
        <tbody>
          {historiques.map((historique) => (
            <tr key={historique.id}>
              <th>{historique.id}</th>
              <th>{historique.date_debut}</th>
              <th>{historique.date_fin}</th>
              <th>
                <button
                  onClick={(e) => {
                    handle(historique.id);
                  }}
                >
                  detail
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Historiques;
