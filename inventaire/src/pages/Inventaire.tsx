import React, { FunctionComponent, useEffect, useState } from "react";
import { styled } from "styled-components";
import { Article, User } from "../helpers/Types";
import { Dispatch, SetStateAction } from "react";
import ArticleService from "../helpers/DbArticle";
import Inv from "../components/Inv";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  & tr,
  th,
  table,
  td,
  input {
    min-width: 50px;
    min-height: 40px;
  }
  & input {
    font-size: 1em;
    border: none;
    outline: none;
  }
  & table,
  td,
  th {
    outline: solid 1px black;
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
type Form = {
  nom: Field<string>;
  prix_achat: Field<number>;
  prix_vente: Field<number>;
  id: Field<number>;
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
};

const Inventaire: FunctionComponent<Props> = ({
  user,
  setUser,
  setUserIslogged,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    ArticleService.getArticles().then((articles) => setArticles(articles));
  }, []);
  const [Form] = useState<Form>({
    nom: {
      isValid: true,
      value: "",
    },
    prix_achat: {
      isValid: true,
      value: 0,
    },
    prix_vente: {
      isValid: true,
      value: 0,
    },
    id: {
      isValid: true,
      value: 0,
    },
  });

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
    console.log(Form);
    console.log("inventaire enregistrer");
  };

  return (
    <Container>
      <div>
        <h1>Faire un inventaire</h1>
        <div className="date">
          <p>Selectionner la date de vos comptes</p>
          <label htmlFor="date_debut">date de début:</label>
          <input
            value={duree.date_debut.value}
            name="date_debut"
            onChange={(e) => handleInputChange(e)}
            className="-date-input "
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
          <button onClick={() => setChange(false)}>Valider</button>
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
                    <Inv id={item.id} />
                  </tr>
                ))
              : articles.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nom}</td>
                    <td>{item.prix_achat}</td>
                    <td>{item.prix_vente}</td>
                    <Inv id={item.id} duree={duree} />
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
