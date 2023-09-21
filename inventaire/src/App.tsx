import React, {
  FunctionComponent,
  createContext,
  useEffect,
  useState,
} from "react";
import NavBar from "./components/navigations/NavBar";
import AllPages from "./components/navigations/AllPages";
import { styled } from "styled-components";
import { Article, Lambda, Roger, User } from "./helpers/Types";
import useDonnee from "./helpers/useDonnee";

const Pages = styled.div`
  background-color: rgb(255, 230, 221);
  min-height: 100vh;

  & table {
    width: 100px;
  }
`;

const M = styled.div`
  background-color: azure;
  position: absolute;
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  cursor: pointer;
  & div {
    background-color: grey;
    height: 5px;
    border-radius: 12px;
    width: 80%;
    margin: 5px auto;
  }
`;

type AppContextValue = {
  user: User;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
};

export const AppContext = createContext<AppContextValue | null>(null);
const App: FunctionComponent = () => {
  const [user, setUser] = useState<User>(Lambda);
  const [userIsLogged, setUserIsLogged] = useState<boolean>(false);
  const [state, setState] = useState<boolean>(false);
  const {
    inventaires,
    setInventaires,
    setHistoriques,
    historiques,
    articles,
    setArticles,
    achats,
    setAchats,
    ventes,
    setVentes,
  } = useDonnee(state);

  const handle = () => {
    setState(!state);
    console.log(state);
  };

  useEffect(() => {
    console.log('vos ventes',ventes);
    
    if (localStorage.getItem("user_token") === "roger") {
      setUserIsLogged(true);
      setUser(Roger);
    }
  }, []);

  return userIsLogged && user !== null ? (
    <div>
      {" "}
      <div>
        <M onClick={() => handle()}>
          <div></div>
          <div></div>
          <div></div>
        </M>
        <Pages>
          <NavBar userIsLogged={true} state={state} />
          <AllPages
            userIsLogged={true}
            user={user}
            setUser={setUser}
            setUserIsLogged={setUserIsLogged}
            articles={articles}
            setArticles={setArticles}
            inventaires={inventaires}
            setInventaires={setInventaires}
            historiques={historiques}
            setHistoriques={setHistoriques}
            achats={achats}
            setAchats={setAchats}
            ventes={ventes}
            setVentes={setVentes}
          />
        </Pages>
      </div>
    </div>
  ) : (
    <div>
      <div>
        <M onClick={() => handle()}>
          <div></div>
          <div></div>
          <div></div>
        </M>
        <Pages>
          <NavBar userIsLogged={false} state={state} />
          <AllPages
            userIsLogged={false}
            user={null}
            setUser={setUser}
            setUserIsLogged={setUserIsLogged}
            articles={articles}
            setArticles={setArticles}
            inventaires={inventaires}
            setInventaires={setInventaires}
            historiques={historiques}
            setHistoriques={setHistoriques}
            achats={achats}
            setAchats={setAchats}
            ventes={ventes}
            setVentes={setVentes}
          />
        </Pages>
      </div>
    </div>
  );
};

export default App;
