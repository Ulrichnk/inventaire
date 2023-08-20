import React ,{FunctionComponent, useState} from 'react';
import { Article } from '../helpers/types/Types';
import { useArticle } from '../helpers/DbArticle';

type Props={
//define your props here
}

const AjoutArticle: FunctionComponent<Props>=()=>{
    const [data]=useState<Article[]>(useArticle);

   return (
    <div>
    <h1>Tableau de données</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prix d'achat</th>
          <th>Prix de vente</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nom}</td>
            <td>{item.prix_achat}</td>
            <td>{item.prix_vente}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    );
};

export default AjoutArticle;