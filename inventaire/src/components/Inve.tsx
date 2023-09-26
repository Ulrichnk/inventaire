import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import {
  Article,
  Inventaire,
  fusionAchat,
  fusionVente,
} from "../helpers/Types";
import localServices from "../helpers/LocalService";
import { useAppContext } from "../helpers/AppContext";
import { benef, benefA } from "../pages/inventaires/Inventaire";

type Props = {
  //define your props here
  s: boolean;
  id_hist: number;
  article: Article;
  benefs: benef[];
  setBenef: React.Dispatch<React.SetStateAction<benef[]>>;
  setBenefAttendu: React.Dispatch<React.SetStateAction<benefA[]>>;
  benefAttendu: benefA[];
};
const Inve: FunctionComponent<Props> = ({
  benefs,
  setBenef,
  id_hist,
  setBenefAttendu,
  benefAttendu,
  article,
  s,
}) => {
  const updateBenefReel = (
    newBenefValue: number,
    setBenef: React.Dispatch<React.SetStateAction<benef[]>>
  ): void => {
    setBenef((prevBenefs) =>
      prevBenefs.map((benef) =>
        benef.id === article.id ? { ...benef, benefReel: newBenefValue } : benef
      )
    );
  };
  const updateBenefAttendu = (
    newBenefValue: number,
    setBenef: React.Dispatch<React.SetStateAction<benefA[]>>
  ): void => {
    setBenef((prevBenefs) =>
      prevBenefs.map((benef) =>
        benef.id === article.id ? { ...benef, benefAttendu: newBenefValue } : benef
      )
    );
  };
  

  const { inventaires, historiques, achats, ventes } = useAppContext();
  const hist = localServices.getHistoriqueById(id_hist, historiques);

  const [stock, setStock] = useState<Inventaire>({
    id: 0,
    id_article: 0,
    id_historique: 0,
    stock_depart: 0,
    stock_achat: 0,
    stock_restant: 0,
  });
  const [vente, setVente] = useState<number>(
    fusionVente(
      ventes,
      article.id,
      hist?.date_debut as string,
      hist?.date_fin as string
    )
  );
  const [achat, setAchat] = useState<number>(
    fusionAchat(
      achats,
      article.id,
      hist?.date_debut as string,
      hist?.date_fin as string
    )
  );

  const stock_total = useMemo(
    () => (-achat - stock.stock_depart)*-1,
    [achat, stock.stock_depart]
  );
  const stock_calc_restant = useMemo(
    () => stock_total - vente,
    [stock_total, vente]
  );
  const [stock_restant] = useState<number>(stock.stock_restant);

  useEffect(() => {
    updateBenefAttendu(
      (article.prix_vente - article.prix_achat) * vente,
      setBenefAttendu
    );

    updateBenefReel(
      (stock_total - stock.stock_restant) *
        (article.prix_vente - article.prix_achat),
      setBenef
    );
    if (hist) {
      setVente(
        fusionVente(
          ventes,
          article.id,
          hist.date_debut as string,
          hist.date_fin as string
        )
      );
      setAchat(
        fusionAchat(
          achats,
          article.id,
          hist.date_debut as string,
          hist.date_fin as string
        )
      );
    }

    const fetch = async (id_hist: number) => {
      localServices
        .getInventaire(id_hist, article.id, inventaires)
        .then((a) => {
          if (a && a !== null) {
            setStock(a);
          } else {
            console.log(
              "vous avez une erreur pour la recuperation de l'inventaire"
            );
          }
        });
    };
    fetch(id_hist);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const h = () => {
      updateBenefAttendu(
        (article.prix_vente - article.prix_achat) * vente,
        setBenefAttendu
      );
      updateBenefReel(
        (stock_total - stock.stock_restant) *
            (article.prix_vente - article.prix_achat),
        setBenef
      );
    };

    h();
  }, [stock_total, s, stock.stock_restant, article, article.id, setBenef]);
  return (
    <>
      <td> {stock ? stock.stock_depart : "stock depart"} </td>
      <td>{stock ? stock.stock_achat : "stock_acheter"}</td>
      <td>{stock ? -1*(-stock.stock_achat - stock.stock_depart) : "stock total"} </td>
      <td>{vente}</td>
      <td>{stock.stock_restant}</td>
      <td>{-stock.stock_restant + stock_calc_restant}</td>
      <td>
        {article
          ? (article.prix_vente - article.prix_achat) * vente
          : "benefice attendu"}
      </td>
      <td>
        {article
          ? (stock_total - stock.stock_restant) *
            (article.prix_vente - article.prix_achat)
          : "Bénéfice réel avec le stock restant"}
      </td>
    </>
  );
};

export default Inve;
