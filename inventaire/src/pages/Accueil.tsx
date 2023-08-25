import React, { FunctionComponent } from "react";
import { styled } from "styled-components";
import ArticleSearch from "../components/article-search";

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
    <div>
      <ArticleSearch />
    </div>
  );
};

export default Accueil;
