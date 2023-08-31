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
} from "../../helpers/Types";
import Achatpages from "../../pages/Achat";
import InventairePages from "../../pages/Inventaire";
import Gestion from "../../pages/Gestion";
import Essai from "../../Essai";
import Inconnu from "../../pages/inconnu";
import Historiques from "../../pages/Historiques";
import HistoriqueDetail from "../../pages/HistoriqueDetail";
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
}) => {
  return userIsLogged ? (
    <>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/essai" element={<Essai />} />
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
            />
          }
        />
        <Route
          path="/enregistrement-vente"
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
            />
          }
        />
        <Route path="*" element={<Inconnu />} />
      </Routes>
    </>
  );
};

export default AllPages;
