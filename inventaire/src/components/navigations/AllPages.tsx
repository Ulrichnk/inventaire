import React, { FunctionComponent } from "react";
import { Dispatch, SetStateAction } from "react";
import { Route, Routes } from "react-router-dom";
import Accueil from "../../pages/Accueil";
import Log from "../../pages/Log";
import {
  Achat,
  Article,
  Historique,
  Inventaire,
  User,
  Vente,
} from "../../helpers/Types";
import Achatpages from "../../pages/Achat";
import InventairePages from "../../pages/Inventaire";
import Gestion from "../../pages/Gestion";
import Essai from "../../Essai";
import Inconnu from "../../pages/inconnu";
import Historiques from "../../pages/Historiques";
import HistoriqueDetail from "../../pages/HistoriqueDetail";
import UpdateArticle from "../../pages/UpdateArticle";
import Ventepages from "../../pages/Ventepages";
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
        <Route path="/essai" element={<Essai articles={articles} />} />
        <Route
          path="/gestion-articles"
          element={
            <Gestion
              user={user}
              setUser={setUser}
              setUserIslogged={setUserIsLogged}
              articles={articles}
              setArticles={setArticles}
            />
          }
        />
        <Route
          path="/inventaire"
          element={
            <InventairePages
              user={user}
              setUser={setUser}
              setUserIslogged={setUserIsLogged}
              articles={articles}
              setArticles={setArticles}
              inventaires={inventaires}
              setInventaires={setInventaires}
              historiques={historiques}
              setHistoriques={setHistoriques}
              ventes={ventes}
              achats={achats}
            />
          }
        />
        <Route
          path="/enregistrement-ventes" // Remplacez le chemin pour refléter "ventes" au lieu d'"achats"
          element={
            <Ventepages
              articles={articles}
              setArticles={setArticles}
              ventes={ventes} // Remplacez "achats" par "ventes"
              setVentes={setVentes} // Remplacez "achats" par "ventes"
            />
          }
        />

        <Route
          path="/enregistrement-achats"
          element={
            <Achatpages
              articles={articles}
              setArticles={setArticles}
              achats={achats}
              setAchats={setAchats}
            />
          }
        />
        <Route
          path="/historiques"
          element={<Historiques historiques={historiques} />}
        />
        <Route
          path="/historiques/:id"
          element={
            <HistoriqueDetail
              articles={articles}
              setArticles={setArticles}
              inventaires={inventaires}
              setInventaires={setInventaires}
              historiques={historiques}
              setHistoriques={setHistoriques}
            />
          }
        />
        <Route
          path="/modifier/article/:id"
          element={
            <UpdateArticle articles={articles} setArticles={setArticles} />
          }
        />
        <Route path="*" element={<Inconnu />} />
      </Routes>
    </>
  ) : (
    <>
      <Routes>
        <Route path="/essai" element={<Essai articles={articles} />} />
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
        <Route
          path="/inventaire"
          element={
            <InventairePages
              user={user}
              setUser={setUser}
              setUserIslogged={setUserIsLogged}
              articles={articles}
              setArticles={setArticles}
              inventaires={inventaires}
              setInventaires={setInventaires}
              historiques={historiques}
              setHistoriques={setHistoriques}
              ventes={ventes}
              achats={achats}
            />
          }
        />
        <Route path="*" element={<Inconnu />} />
      </Routes>
    </>
  );
};

export default AllPages;
