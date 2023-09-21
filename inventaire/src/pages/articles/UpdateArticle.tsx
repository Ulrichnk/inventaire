import React, { useState, FunctionComponent, useEffect } from "react";
import { Article } from "../../helpers/Types";
import { useParams } from "react-router-dom";
import Input from "../../components/Input";
import { styled } from "styled-components";
import localServices from "../../helpers/LocalService";
import { useAppContext } from "../../helpers/AppContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 90px;
  & table,
  td,
  th {
    outline: solid 1px black;
  }
  & table {
    min-width: 700px;
    margin: 0 auto;
    border-collapse: collapse;
    border-spacing: 0;
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
    min-width: 50px;
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
type Props = {
  //define your props here
};

type Params = {
  id: string;
};

const UpdateArticle: FunctionComponent<Props> = () => {
  const { id } = useParams<Params>();
  const id_article = parseInt(id ? id : "1", 10);
  const [article, setArticle] = useState<Article>();
  const {
    inventaires,
    setInventaires,
    setHistoriques,
    historiques,
    articles,
    setArticles,
    achats,
    setAchats,
    ventes,
    setVentes,
  } = useAppContext();
  useEffect(() => {
    const fetchArticle = async () => {
      const fetchedArticle: Article | undefined =
        await localServices.getArticle(id_article, articles);
      if (fetchArticle !== undefined) {
        console.log("reussite");
        console.log(fetchedArticle);
        setArticle(fetchedArticle as Article);
      }
    };

    fetchArticle();
  }, [articles, id_article]);

  const [Form, setForm] = useState<Form>({
    nom: {
      isValid: true,
      value: article?.nom,
    },
    prix_achat: {
      isValid: true,
      value: article?.prix_achat,
    },
    prix_vente: {
      isValid: true,
      value: article?.prix_vente,
    },
    id: {
      isValid: true,
      value: id_article,
    },
  });

  const Handle = async () => {
    console.log("modif");
    console.log(Form);

    if (
      Form.id.value &&
      Form.nom.value &&
      Form.prix_achat.value &&
      Form.prix_vente.value
    ) {
      await localServices.updateArticle(
        {
          id: Form.id.value,
          nom: Form.nom.value,
          prix_achat: Form.prix_achat.value,
          prix_vente: Form.prix_vente.value,
          created_at: new Date(),
        },
        articles,
        setArticles
      );
      return;
    } else {
      console.log("echec");
    }
  };

  return article ? (
    <div>
      <Container>
        <div>
          <h1>Modifier un article</h1>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prix d'achat</th>
                <th>Prix de vente</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{article.nom}</td>
                <td>{article.prix_achat}</td>
                <td>{article.prix_vente}</td>
              </tr>
              <Input Form={Form} setForm={setForm} />
            </tbody>
          </table>
          <button onClick={Handle}>Valider la modifcation</button>
        </div>
      </Container>
    </div>
  ) : (
    <div>attendez</div>
  );
};

export default UpdateArticle;
