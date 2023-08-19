import React, { FunctionComponent, useEffect } from "react";
import NavBar from "./components/navigations/NavBar";
import AllPages from "./components/navigations/AllPages";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useLogin } from "./hooks/useLogin";
import AuthContext from "./helpers/AuthContext";

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
const App: FunctionComponent = () => {
  const navigate = useNavigate();
  const { user, userIsLogged, userIsDeleted, loginUser } = useLogin();

  const logout=()=>{
    localStorage.removeItem('user_token');
    navigate('/')

  }

  const menu: JSX.Element = (
    <MenuItem>
      <div onClick={(e) => navigate("/log")}>
        <p>Me connecter</p>
      </div>
      <span id="1"></span>
      <div onClick={(e) => navigate("/log")}>
        <p>Mes commandes</p>
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
      <div onClick={(e) => navigate("/account")}>
        <p>Mon profil</p>
      </div>
      <div onClick={(e) => navigate("/mes-produits")}>
        <p>Mes produits</p>
      </div>
      <div onClick={(e) => navigate("/mes-commandes")}>
        <p>Mes commandes</p>
      </div>
      <span id="1"></span>
      <div onClick={() => logout()}>
        <p>Se déconnecter</p>
      </div>

    </MenuItem>
  );
  useEffect(() => {
    loginUser().then((res) => {});
  }, []);

  return userIsLogged && user !== null ? (
    <AuthContext.Provider value={{ user }}>
      <NavBar userIsLogged={false} menu={menu1} />
      <AllPages userIsLogged={true} user={user} />
    </AuthContext.Provider>
  ) : (
    <>
      <NavBar userIsLogged={false} menu={menu} />
      <AllPages userIsLogged={false} user={null} />
    </>
  );
};

export default App;
