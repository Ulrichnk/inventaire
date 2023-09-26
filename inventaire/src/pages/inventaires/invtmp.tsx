import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Article, fusionAchat, fusionVente } from "../../helpers/Types";
import { useAppContext } from "../../helpers/AppContext";
import localServices from "../../helpers/LocalService";
export type benef = {
  benefReel: number;
  id: number;
};
export type benefA = {
  benefAttendu: number;
  id: number;
};
type Field<T> = {
  value?: T;
  isValid?: boolean;
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
  benefs?: benef[];
  setBenef?: React.Dispatch<React.SetStateAction<benef[]>>;
  setBenefAttendu?: React.Dispatch<React.SetStateAction<benefA[]>>;
  benefAttendu?: benefA[];
};
const InvTmp: FunctionComponent<Props> = ({
  benefs = [],
  setBenef,
  id,
  duree,
  state,
  id_historique,
  setBenefAttendu,
  benefAttendu = [],
}) => {
  const [s, sets] = useState<boolean>(false);
  const cl = s ? "input false" : "input";

  const updateBenefReel = (
    newBenefValue: number,
    setBenef: React.Dispatch<React.SetStateAction<benef[]>>
  ): void => {
    setBenef((prevBenefs) =>
      prevBenefs.map((benef) =>
        benef.id === id ? { ...benef, benefReel: newBenefValue } : benef
      )
    );
  };
  const updateBenefAttendu = (
    newBenefValue: number,
    setBenef: React.Dispatch<React.SetStateAction<benefA[]>>
  ): void => {
    setBenef((prevBenefs) =>
      prevBenefs.map((benef) =>
        benef.id === id ? { ...benef, benefAttendu: newBenefValue } : benef
      )
    );
  };
  
  const { inventaires, setInventaires, historiques, articles, achats, ventes } =
    useAppContext();
  console.log("vos achats dans l id", id, achats);

  const [article, setArticle] = useState<Article>();
  const [stock_depart, setStockDepart] = useState<number>(0);
  const [vente, setVente] = useState<number>(0);
  const [achat, setAchat] = useState<number>(0);
  const stock_total = useMemo(
    () => (-achat - stock_depart)*-1,
    [achat, stock_depart]
  );
  const stock_calc_restant = useMemo(
    () => stock_total - vente,
    [stock_total, vente]
  );
  const [stock_restant, setStockRestant] = useState<string>("");

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
        localServices.getInventaire(a.id, id, inventaires).then((a) => {
          if (a && a !== null) {
            setStockDepart(a.stock_restant as number);
          } else {
            console.log("recuperation de l'inventaire dont id", id, a);
            console.log(
              "vous avez une erreur pour la recuperation de l'inventaire dont l'id est",
              id
            );
          }
        });
      } else {
        console.log("vous avez une erreur pour l'historique");
      }
    };

    if (duree) {
      fetch(duree);

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
    } else {
    }
    // eslint-disable-next-line
  }, [duree]);
  useEffect(() => {
    if (state) {
      console.log("votre state ", state);
      const fetch = () => {
        if (state && duree?.date_debut.value && duree?.date_fin.value) {
          if (stock_restant === "") {
            localServices
              .addInventaire(
                id_historique,
                id,
                achat as number,
                0,
                stock_depart as number,
                setInventaires
              )
              .then((inve) => {
                console.log("inventaire enregistrer");
                console.log(inve);
              });
          } else {
            localServices
              .addInventaire(
                id_historique,
                id,
                achat as number,
                parseFloat(stock_restant),
                stock_depart as number,
                setInventaires
              )
              .then((inve) => {
                console.log("inventaire enregistrer");
                console.log(inve);
              });
          }
        } else {
          console.log("erreur lors de l envoi");
        }
      };

      fetch();
    }
  }, [
    achat,
    id,
    duree?.date_debut.value,
    duree?.date_fin.value,
    state,
    id_historique,
    stock_depart,
    setInventaires,
    stock_restant,
  ]);

  const hand = (e: any) => {
    if (e.target.value === "") {
    }
    if (isNaN(parseFloat(e.target.value)) && e.target.value !== "") {
      console.log("echec");
      sets(true);
      return;
    } else {
      sets(false);
      setStockRestant(e.target.value);
      if (article && setBenef && setBenefAttendu) {
        updateBenefAttendu(
          (article.prix_vente - article.prix_achat) * vente,
          setBenefAttendu
        );
        if (e.target.value === "") {
          updateBenefReel(
            stock_total * (article.prix_vente - article.prix_achat),
            setBenef
          );
        } else {
          updateBenefReel(           
            (stock_total - parseFloat(e.target.value)) *
              (article.prix_vente - article.prix_achat),
            setBenef
          );
        }
      }
    }
  };
  const calcBenef = () => {
    if (article) {
      if (stock_restant === "") {
        return stock_total * (article.prix_vente - article.prix_achat);
      } else {
        return (
          (stock_total - parseFloat(stock_restant)) *
          (article.prix_vente - article.prix_achat)
        );
      }
    } else {
      return 0;
    }
  };
  useEffect(() => {
    const h = () => {
      if (article && setBenef && setBenefAttendu) {
        updateBenefAttendu(
          (article.prix_vente - article.prix_achat) * vente,
          setBenefAttendu
        );
        if (stock_restant === "") {
          updateBenefReel(
            stock_total * (article.prix_vente - article.prix_achat),
            setBenef
          );
        } else {
          updateBenefReel(
            (stock_total - parseFloat(stock_restant)) *
              (article.prix_vente - article.prix_achat),
            setBenef
          );
        }
      }
    };

    h();
  }, [stock_total, stock_restant, article, id, setBenef]);

  const [renderCount, setRenderCount] = useState(0);
  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1);
  }, []);
  console.log("nombre de render", renderCount);

  return (
    <>
      <td> {stock_depart} </td>
      <td>{achat}</td>
      <td>{stock_total}</td>
      <td>{vente}</td>
      <td>
        <input
          value={stock_restant}
          name="stock_restant"
          onChange={(e) => hand(e)}
          className={cl}
          placeholder="stock restant "
          type="text"
        />
      </td>
      <td>
        {parseFloat(stock_restant)
          ? -parseFloat(stock_restant) + stock_calc_restant
          : ""}
      </td>
      <td>
        {article
          ? (article.prix_vente - article.prix_achat) * vente
          : "Bénéfice attendu"}{" "}
      </td>
      <td>{article ? calcBenef() : "Bénéfice réel avec le stock restant"}</td>
    </>
  );
};
export default InvTmp;
