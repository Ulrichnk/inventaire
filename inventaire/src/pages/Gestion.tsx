import React, { FunctionComponent, useContext, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Article, User } from "../helpers/Types";
import { styled } from "styled-components";
import { AppContext } from "../App";
import ArticleFireService from "../helpers/ArticleFire";
import Input from "../components/Input";

type Props = {
  //define your props here
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
  setUserIslogged: Dispatch<SetStateAction<boolean>>;
  articles: Article[];
  setArticles: Dispatch<SetStateAction<Article[]>>;
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
  text-align: center;
  margin-top: 150px;
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
const Cont = styled.div`
  display: flex;
  flex-direction: column;
`;

const Acc = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 150px;
  min-height: 100vh;
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
    & th {
      padding: 12px 15px;
    }
    & td {
      padding: 10px 20px;
    }
    & tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    & td,
    th,
    button {
      padding: 10px 20px;
    }
  }

  & h1 {
    color: orange;
  }
`;

const Search = styled.div`
  & input {
    width: 40%;
    height: 40px;
    outline: solid 2px orange;
    border-radius: 15px;
    text-align: center;
  }
`;

const Gestion: FunctionComponent<Props> = ({
  user,
  setUser,
  setUserIslogged,
  articles,
  setArticles,
}) => {
  const [term, setTerm] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const contextValue = useContext(AppContext);
  // const style: CSSProperties = { textDecoration: "none" };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);

    if (term.length <= 1) {
      setArticles([]);
      return;
    }
    setSearch(true);
    ArticleFireService.searchArticle(term).then((articles) => {
      setArticles(articles);
      console.log(articles);
    });
  };
  const handle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ): void => {
    ArticleFireService.deleteArticle(id).then((res) => {
      ArticleFireService.getArticles().then((articles) => {
        setArticles(articles);
      });
    });
    console.log(e);
  };

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

  const HandleSubmit = () => {
    console.log(Form);
    console.log("article enregistrer");
    if (
      Form.nom.value &&
      Form.prix_achat.value &&
      Form.prix_vente.value &&
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
      ArticleFireService.addArticle(a).then((res) => {
        ArticleFireService.getArticles().then((articles) => {
          setArticles(articles);
        });
      });
      setForm({
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

      alert("article ajouté");
    } else {
      alert("veuillez remplir tous les champs !");
    }
  };

  return (
    <Cont>
      <div className="n">
        <Container>
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
                <Input Form={Form} setForm={setForm} />
              </tbody>
            </table>
            <button onClick={HandleSubmit}>Valider l'ajout</button>
          </div>
        </Container>{" "}
      </div>
      <Acc>
        <h1>Supprimer un article</h1>
        <Search>
          <input
            type="text"
            placeholder="Rechercher un article"
            value={term}
            onChange={(e) => handleInputChange(e)}
          />
        </Search>
        <div>
          <br />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prix d'achat</th>
                <th>Prix de vente</th>
                <th>Suppression</th>
              </tr>
            </thead>
            <tbody>
              {search
                ? articles.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nom}</td>
                      <td>{item.prix_achat}</td>
                      <td>{item.prix_vente}</td>
                      <td>
                        <button
                          onClick={(e) => {
                            handle(e, item.id);
                          }}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))
                : articles.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nom}</td>
                      <td>{item.prix_achat}</td>
                      <td>{item.prix_vente}</td>
                      <td>
                        <button
                          onClick={(e) => {
                            handle(e, item.id);
                          }}
                        >
                          X
                        </button>{" "}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </Acc>
    </Cont>
  );
};

export default Gestion;
