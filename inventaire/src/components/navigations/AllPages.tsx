import React, { FunctionComponent } from "react";
import { Dispatch, SetStateAction } from "react";
import { Route, Routes } from "react-router-dom";
import Accueil from "../../pages/Accueil";
import Log from "../../pages/Log";
import { Article, User } from "../../helpers/Types";
import Achat from "../../pages/Achat";
import Inventaire from "../../pages/Inventaire";
import Gestion from "../../pages/Gestion";
import Essai from "../../Essai";
import Inconnu from "../../pages/inconnu";
type Props = {
  userIsLogged: Boolean;
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
  setUserIsLogged: Dispatch<SetStateAction<boolean>>;
  articles: Article[];
  setArticles: Dispatch<SetStateAction<Article[]>>;
};

const AllPages: FunctionComponent<Props> = ({
  userIsLogged,
  user,
  setUser,
  setUserIsLogged,
  articles,
  setArticles,
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
            <Inventaire
              user={user}
              setUser={setUser}
              setUserIslogged={setUserIsLogged}
            />
          }
        />
        <Route path="/enregistrement-vente" element={<Achat />} />
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
            <Inventaire
              user={user}
              setUser={setUser}
              setUserIslogged={setUserIsLogged}
            />
          }
        />
        <Route path="*" element={<Inconnu />} />
      </Routes>
    </>
  );
};

export default AllPages;
