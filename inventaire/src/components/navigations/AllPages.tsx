import React, { FunctionComponent } from "react";
import { Dispatch, SetStateAction } from "react";
import { Route, Routes } from "react-router-dom";
import Accueil from "../../pages/Accueil";
import Log from "../../pages/Log";
import { User } from "../../helpers/Types";
import Achat from "../../pages/Achat";
import AjoutArticle from "../../pages/AjoutArticle";
import Inventaire from "../../pages/Inventaire";
import Gestion from "../../pages/Gestion";
type Props = {
  userIsLogged: Boolean;
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
  setUserIsLogged: Dispatch<SetStateAction<boolean>>;
};

const AllPages: FunctionComponent<Props> = ({
  userIsLogged,
  user,
  setUser,
  setUserIsLogged,
}) => {
  return userIsLogged ? (
    <>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route
          path="/gestion-articles"
          element={
            <Gestion
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
        <Route path="/enregistrement-achat" element={<Achat />} />
        <Route path="/ajout-article" element={<AjoutArticle />} />
      </Routes>
    </>
  ) : (
    <>
      <Routes>
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
      </Routes>
    </>
  );
};

export default AllPages;
