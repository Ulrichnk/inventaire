import React, { FunctionComponent } from "react";
import { styled } from "styled-components";

export const Acc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  & table,
  td,
  th {
    outline: solid 1px black;
  }
  & table {
    min-width: 700px;
  }
  & h1 {
    color: red;
  }
`;

const Accueil: FunctionComponent = () => {
  return (
    <h1>
      Bienveunue sur ce site dédié a effectuer un inventaire, il est encore en
      developpement
    </h1>
  );
};

export default Accueil;
