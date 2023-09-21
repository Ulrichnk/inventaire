import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Achat,
  Article,
  Historique,
  Inventaire,
  Vente,
  fusionAchat,
  fusionVente,
} from "../helpers/Types";
import localServices from "../helpers/LocalService";

type Field<T> = {
  value?: T;
  isValid?: boolean;
};
type Form = {
  id: Field<number>;
  stock_achat: Field<number>;
  stock_restant: Field<number>;
};
type Duree = {
  date_debut: Field<string>;
  date_fin: Field<string>;
};

type Props = {
  //define your props here
  id: number;
  duree?: Duree;
  state?: boolean;
  id_historique: number;
  articles: Article[];
  setArticles: Dispatch<SetStateAction<Article[]>>;
  inventaires: Inventaire[];
  setInventaires: Dispatch<SetStateAction<Inventaire[]>>;
  historiques: Historique[];
  setHistoriques: Dispatch<SetStateAction<Historique[]>>;
  ventes: Vente[];
  achats: Achat[];
};
const Inv: FunctionComponent<Props> = ({
  id,
  duree,
  state,
  id_historique,
  articles,
  setArticles,
  setInventaires,
  inventaires,
  historiques,
  setHistoriques,
  ventes,
  achats,
}) => {
  const [article, setArticle] = useState<Article>();
  const [stock_depart, setStockDepart] = useState<number>(0);
  const [vente, setVente] = useState<number>(0);
  const [achat, setAchat] = useState<number>(0);
  if (duree) {
    setVente(
      fusionVente(
        ventes,
        id,
        duree.date_debut.value as string,
        duree.date_fin.value as string
      )
    );
    setAchat(
      fusionAchat(
        achats,
        id,
        duree.date_debut.value as string,
        duree.date_fin.value as string
      )
    );
  }
  const [Form, setForm] = useState<Form>({
    id: {
      isValid: true,
      value: 0,
    },
    stock_achat: {
      isValid: true,
      value: 0,
    },
    stock_restant: {
      isValid: true,
      value: 0,
    },
  });

  useEffect(() => {
    const a: Article | undefined = localServices.getArticle(id, articles);
    if (a && a !== null) {
      setArticle(a);
      console.log(
        "vous avez reussi la recuperation de l'article dont l'id est",
        id
      );
    } else {
      console.log(
        "vous avez une erreur pour la recuperation de l'article dont l'id est",
        id
      );
    }
  }, [id, articles]);

  useEffect(() => {
    const fetch = async (duree: Duree) => {
      const a = localServices.getHistorique1(
        duree.date_debut.value ? duree.date_debut.value : "",
        historiques
      );
      if (a && a !== null) {
        console.log(a);
        localServices.getInventaire(a.id, id, inventaires).then((a) => {
          if (a && a !== null) {
            setStockDepart(a.stock_restant);
          } else {
            console.log(
              "vous avez une erreur pour la recuperation de l'inventaire"
            );
          }
        });
      } else {
        console.log("vous avez une erreur pour l'historique");
      }
    };
    if (duree) {
      fetch(duree);
    } else {
    }
    // eslint-disable-next-line
  }, [duree]);

  useEffect(() => {
    console.log("votre state ", state);
    const fetch = () => {
      if (
        state &&
        duree?.date_debut.value &&
        duree?.date_fin.value &&
        Form.stock_achat.value &&
        Form.stock_restant.value
      ) {
        localServices
          .addInventaire(
            id_historique,
            id,
            Form.stock_achat.value as number,
            Form.stock_restant.value as number,
            stock_depart as number,
            setInventaires
          )
          .then((inve) => {
            console.log("inventaire enregistrer");
            console.log(inve);
            setForm({
              id: {
                isValid: true,
                value: 0,
              },
              stock_achat: {
                isValid: true,
                value: 0,
              },
              stock_restant: {
                isValid: true,
                value: 0,
              },
            });
          });
      } else {
        console.log("erreur lors de l envoi");
      }
    };

    fetch();
  }, [state]);

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
  return (
    <>
      <td> {stock_depart} </td>
      <td>
        {/* <input
          value={Form.stock_achat.value !== 0 ? Form.stock_achat.value : ""}
          name="stock_achat"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="stock acheter "
          type="text"
        /> */}
        {achat}
      </td>
      <td>
        {/* {Form.stock_achat.value
          ? (-Form.stock_achat.value - stock_depart) * -1
          : "stock total"}{" "} */}
        {-1 * (-achat - stock_depart)}
      </td>
      <td>{vente}</td>
      <td>
        {article && article.prix_vente
          ? vente * article.prix_vente
          : "valeur stock vente"}
      </td>
      <td>
        {/* {article &&
        article.prix_achat !== undefined &&
        Form.stock_achat.value !== undefined
          ? article.prix_achat * Form.stock_achat.value
          : "valeur stock acheter"} */}
        {article && article.prix_achat
          ? achat * article.prix_achat
          : "valeur stock acheter"}
      </td>
      <td>
        {article ? stock_depart * article.prix_achat : "valeur stock depart"}{" "}
      </td>
      <td>
        {/* {Form.stock_achat.value && article
          ? (-stock_depart - Form.stock_achat.value) * -1 * article.prix_achat
          : "valeur stock total"}{" "} */}
        {article && article.prix_achat
          ? -1 * (-achat - stock_depart) * article.prix_achat
          : "valeur stock total"}
      </td>
      <td>
        <input
          value={Form.stock_restant.value !== 0 ? Form.stock_restant.value : ""}
          name="stock_restant"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="stock restant "
          type="text"
        />
        {/* {achat - vente} */}
      </td>
      <td>
        {/* {article &&
        article.prix_vente !== undefined &&
        Form.stock_restant.value !== undefined
          ? article.prix_achat * Form.stock_restant.value
          : "valeur stock restant"} */}
        {article && article.prix_achat
          ? (achat - vente) * article.prix_achat
          : "valeur stock restant"}
      </td>
      <td>
        {/* {article &&
        article.prix_vente !== undefined &&
        article.prix_achat !== undefined &&
        Form.stock_achat.value !== undefined &&
        Form.stock_restant.value !== undefined
          ? (-stock_depart - Form.stock_achat.value) * -1 * article.prix_achat -
            article.prix_achat * Form.stock_restant.value
          : "Bénéfice atttendu"} */}
        {article && article.prix_achat
          ? ((-stock_depart - achat) * -1 * article.prix_achat -
            article.prix_vente * (vente))*-1
          : "benefice réel"}
      </td>
      <td>
        {" "}
        {article &&
        article.prix_vente !== undefined &&
        article.prix_achat !== undefined &&
        Form.stock_achat.value !== undefined &&
        Form.stock_restant.value !== undefined
          ? ((-stock_depart - achat) * -1 * article.prix_achat -
            article.prix_vente * Form.stock_restant.value)*-1
          : "Bénéfice atttendu"}{" "}
      </td>
    </>
  );
};

export default Inv;
