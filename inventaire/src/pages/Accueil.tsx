import React, { FunctionComponent, useState } from "react";
import { styled } from "styled-components";
import ArticleSearch from "../components/article-search";
import { useArticle } from "../helpers/DbArticle";
import { Article } from "../helpers/Types";
const Acc = styled.div`
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
  const [data] = useState<Article[]>(useArticle);

  return (
    <div>
      <ArticleSearch />
    </div>
    // <Acc>
    //   <div>
    //     <h1>Tableau de données</h1>
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>ID</th>
    //           <th>Nom</th>
    //           <th>Prix d'achat</th>
    //           <th>Prix de vente</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.map((item) => (
    //           <tr key={item.id}>
    //             <td>{item.id}</td>
    //             <td>{item.nom}</td>
    //             <td>{item.prix_achat}</td>
    //             <td>{item.prix_vente}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </Acc>
  );
};

export default Accueil;
