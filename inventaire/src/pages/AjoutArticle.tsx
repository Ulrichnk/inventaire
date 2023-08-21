import React, { FunctionComponent, useState } from "react";
import { Article } from "../helpers/Types";
import ArticleService, { add, useArticle } from "../helpers/DbArticle";
import { styled } from "styled-components";

type Props = {
  //define your props here
};
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const AjoutArticle: FunctionComponent<Props> = () => {
  const [nb, setNb] = useState<string>("");
  const [data] = useState<Article[]>(useArticle);
  const [Form, setForm] = useState<Form>({
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    if (e.target.name === "nom") {
      const newField: Field<string> = {
        [fieldName]: { value: fieldValue, isValid: true },
      };
      console.log("vous avez selectionner", fieldName);

      setForm({ ...Form, ...newField });
    } else {
      const newField: Field<number> = {
        [fieldName]: { value: fieldValue, isvalid: true },
      };
      console.log("vous avez selectionner", fieldName);

      setForm({ ...Form, ...newField });
    }
  };
  const HandleSubmit = () => {
    console.log(Form);
    console.log("article enregistrer");
    if (
      Form.nom.value !== "" &&
      Form.prix_achat.value !== 0 &&
      Form.prix_vente.value !== 0
    ) {
      const a: Article = {
        id: 0,
        nom: Form.nom.value,
        prix_achat: Form.prix_achat.value,
        prix_vente: Form.prix_vente.value,
        created_at: new Date(),
      };
      ArticleService.addArticle(a);
    } else {
      alert("veuillez remplir tous les champs !");
    }
  };

  return (
    <Container>
      <div>
        <input
          value={nb}
          onChange={(e) => {
            setNb(e.target.value);
          }}
          className="input"
          placeholder=" Entrer nombre d'articles à ajouter"
          type="text"
        />
      </div>
      <div>
        <h1>Ajouter un article</h1>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix d'achat</th>
              <th>Prix de vente</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    value={Form.nom.value}
                    name="nom"
                    onChange={(e) => handleInputChange(e)}
                    className="input"
                    placeholder="nom article"
                    type="text"
                  />
                </td>
                <td>
                  <input
                    value={Form.prix_achat.value}
                    name="prix_achat"
                    onChange={(e) => handleInputChange(e)}
                    className="input"
                    placeholder="prix d'achat"
                    type="text"
                  />
                </td>
                <td>
                  <input
                    value={Form.prix_vente.value}
                    name="prix_vente"
                    onChange={(e) => handleInputChange(e)}
                    className="input"
                    placeholder="prix de vente"
                    type="text"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={HandleSubmit}>Valider l'ajout</button>
      </div>
    </Container>
  );
};

export default AjoutArticle;
