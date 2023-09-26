import React, { FunctionComponent, useState } from "react";
import localServices from "../../helpers/LocalService";
import { Article, formatDate } from "../../helpers/Types";
import { useAppContext } from "../../helpers/AppContext";

type Props = {
  //define your props here
  item?: Article;
};

const AchatTab: FunctionComponent<Props> = ({ item }) => {
  const { setAchats } = useAppContext();
  const [s, sets] = useState<boolean>(false);
  const cl = s ? "input false" : "input";
  const [achat, setAchat] = useState<string>("");
  const handle = (id: number) => {
    if (isNaN(parseFloat(achat))) {
      console.log("echec");
      sets(true);
      return;
    }
    localServices
      .addAchat(id, parseFloat(achat), formatDate(new Date()), setAchats)
      .then((res) => {
        if (res) {
          console.log("vous avez reussi a enregistrer", res);
          sets(false);
          setAchat("0");
        } else {
          console.log("echec");
          sets(true);
        }
      });
  };
  const handleInput = (e: any) => {
    if (isNaN(parseFloat(e.target.value)) && e.target.value !== "" && e.target.value!=='-') {
      console.log("echec");
      sets(true);
      return;
    } else {
      sets(false)
      setAchat(e.target.value);
    }
  };
  return item ? (
    <>
      {" "}
      <tr>
        <td>{item.id}</td>
        <td>{item.nom}</td>
        <td>{item.prix_achat}</td>
        <td>{item.prix_vente}</td>
        <td>
          <input
            value={achat}
            name="valeur_achat"
            className={cl}
            placeholder="valeur de l'achat "
            type="text"
            onChange={(e) => handleInput(e)}
          />
        </td>
        <td>
          <button onClick={() => handle(item.id)}>Valider les achats</button>
        </td>
      </tr>
    </>
  ) : (
    <></>
  );
};

export default AchatTab;
