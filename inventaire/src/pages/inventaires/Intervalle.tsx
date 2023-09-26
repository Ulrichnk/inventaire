import React, { FunctionComponent, useState } from "react";
import { useAppContext } from "../../helpers/AppContext";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Historique } from "../../helpers/Types";

type Props = {
  //define your props here
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
const Intervalle: FunctionComponent<Props> = () => {
  const { historiques } = useAppContext();
  const [date_fin, setDateFin] = useState<string>("");
  const n: number = historiques.length;
  const lastHistorique: Historique = historiques[n - 1];
  console.log("votre nombre d histo", n);

  let navigate = useNavigate();

  const handle = (id: number) => {
    const DateDebut = new Date(lastHistorique.date_fin).getTime();
    const DateFin = new Date(date_fin).getTime();

    if (lastHistorique && DateDebut < DateFin) {
      navigate(`/inventaires/${id}/${date_fin}`);
    } else {
      console.log(
        "vous avez selectionner une date inférieur a celle considerer comme date de debut"
      );
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFin(e.target.value);
  };
  return lastHistorique ? (
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
                    navigate(`/historiques/${historique.id}`);
                  }}
                >
                  detail
                </button>
              </th>
            </tr>
          ))}

          <tr key={lastHistorique.id}>
            <th>{lastHistorique.id + 1}</th>
            <th>{lastHistorique.date_fin}</th>
            <th>
              <input
                value={date_fin}
                name="date_fin"
                onChange={(e) => handleInput(e)}
                className="date-input"
                placeholder="date de debut "
                type="date"
              />
            </th>
            <th>
              <button
                onClick={(e) => {
                  handle(lastHistorique.id + 1);
                }}
              >
                valider
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </Container>
  ) : (
    <div> loading....</div>
  );
};

export default Intervalle;
