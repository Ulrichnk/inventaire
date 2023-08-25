import React, { FunctionComponent, useState } from "react";
import NavBar from "./components/navigations/NavBar";
import AllPages from "./components/navigations/AllPages";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Lambda, User } from "./helpers/Types";

const MenuItem = styled.div`
  color: black;
  background-color: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 160px;
  max-width: 200px;
  border-radius: 5px;
  border: 0.1px solid;
  & div {
    /*cursor: grab;*/
    transition: 0.8s;
    padding-left: 10px;
  }
  & div:hover {
    background-color: lightgray;
  }
  & [id="1"] {
    background-color: rgb(47, 47, 47);
    height: 1px;
  }
`;
const Pages = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  background-color: rgb(255, 230, 221);
`;
const App: FunctionComponent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(Lambda);
  const [userIsLogged, setUserIsLogged] = useState<boolean>(false);
  const logout = () => {
    localStorage.removeItem("user_token");
    navigate("/");
    window.location.reload();
  };

  const menu: JSX.Element = (
    <MenuItem>
      <div onClick={(e) => navigate("/log")}>
        <p>Me connecter</p>
      </div>
      <span id="1"></span>
      <div onClick={(e) => navigate("/log")}>
        <p>Articles</p>
      </div>
      <div onClick={(e) => navigate("/log")}>
        <p>Mes produits</p>
      </div>
    </MenuItem>
  );
  const menu1: JSX.Element = (
    <MenuItem>
      <div onClick={(e) => navigate("/account")}>
        <p>Bonjour {user ? user.name : ""} </p>
      </div>
      <span id="1"></span>
      <div onClick={(e) => navigate("/inventaire")}>
        <p>Inventaire</p>
      </div>
      <div onClick={(e) => navigate("/enregistrement-achat")}>
        <p>Enregistrer un nouvel achat</p>
      </div>
      <div onClick={(e) => navigate("/ajout-article")}>
        <p>Ajouter un article</p>
      </div>
      <span id="1"></span>
      <div onClick={() => logout()}>
        <p>Se déconnecter</p>
      </div>
    </MenuItem>
  );

  return userIsLogged && user !== null ? (
    <Pages>
      <NavBar userIsLogged={false} menu={menu1} />
      <AllPages
        userIsLogged={true}
        user={user}
        setUser={setUser}
        setUserIsLogged={setUserIsLogged}
      />
    </Pages>
  ) : (
    <Pages>
      <NavBar userIsLogged={false} menu={menu} />
      <AllPages
        userIsLogged={false}
        user={null}
        setUser={setUser}
        setUserIsLogged={setUserIsLogged}
      />
    </Pages>
  );
};

export default App;
