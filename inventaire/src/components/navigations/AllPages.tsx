import React, { FunctionComponent } from "react";
import { Dispatch, SetStateAction } from "react";
import { Route, Routes } from "react-router-dom";
import Accueil from "../../pages/accueil/Accueil";
import Log from "../../pages/Log";
import {
  Achat,
  Article,
  Historique,
  Inventaire,
  User,
  Vente,
} from "../../helpers/Types";
import Achatpages from "../../pages/achats/Achat";
import InventairePages from "../../pages/inventaires/Inventaire";
import Gestion from "../../pages/articles/Gestion";
import Essai from "../../Essai";
import Inconnu from "../../pages/inconnu";
import Historiques from "../../pages/historique/Historiques";
import HistoriqueDetail from "../../pages/historique/HistoriqueDetail";
import UpdateArticle from "../../pages/articles/UpdateArticle";
import Ventepages from "../../pages/ventes/Ventepages";
import InventaireTemporaire from "../../pages/inventaires/inventaire-tpr";
import Intervalle from "../../pages/inventaires/Intervalle";
type Props = {
  userIsLogged: Boolean;
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
  setUserIsLogged: Dispatch<SetStateAction<boolean>>;
  articles: Article[];
  setArticles: Dispatch<SetStateAction<Article[]>>;
  inventaires: Inventaire[];
  setInventaires: Dispatch<SetStateAction<Inventaire[]>>;
  historiques: Historique[];
  setHistoriques: Dispatch<SetStateAction<Historique[]>>;
  achats: Achat[];
  setAchats: Dispatch<SetStateAction<Achat[]>>;
  ventes: Vente[]; // Remplacez "achats" par "ventes"
  setVentes: React.Dispatch<React.SetStateAction<Vente[]>>; // Remplacez "achats" par "ventes"
};

const AllPages: FunctionComponent<Props> = ({
  userIsLogged,
  user,
  setUser,
  setUserIsLogged,
  articles,
  setArticles,
  inventaires,
  historiques,
  setInventaires,
  setHistoriques,
  achats,
  setAchats,
  ventes,
  setVentes,
}) => {
  return userIsLogged ? (
    <>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/essai" element={<Essai />} />
        <Route path="/gestion-articles" element={<Gestion />} />
        <Route path="/inventaires" element={<InventairePages />} />
        <Route path="/inventaire/" element={<Intervalle />} />
        <Route path="/inventaires/:id/:date_fin" element={<InventaireTemporaire />} />

        <Route
          path="/enregistrement-ventes" // Remplacez le chemin pour refléter "ventes" au lieu d'"achats"
          element={<Ventepages />}
        />

        <Route path="/enregistrement-achats" element={<Achatpages />} />
        <Route
          path="/historiques"
          element={<Historiques historiques={historiques} />}
        />
        <Route path="/historiques/:id" element={<HistoriqueDetail />} />
        <Route path="/modifier/article/:id" element={<UpdateArticle />} />
        <Route path="*" element={<Inconnu />} />
      </Routes>
    </>
  ) : (
    <>
      <Routes>
        <Route path="/essai" element={<Essai />} />
        <Route path="/" element={<Accueil />} />
        <Route
          path="/log"
          element={
            <Log
              user={user}
              setUser={setUser}
              setUserIslogged={setUserIsLogged}
            />
          }
        />
        <Route path="/inventaire" element={<InventairePages />} />
        <Route path="*" element={<Inconnu />} />
      </Routes>
    </>
  );
};

export default AllPages;
