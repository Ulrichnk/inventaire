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
import ArticleFireService from "./helpers/ArticleFire";
import useDonnee from "./helpers/useDonnee";

const Pages = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  background-color: rgb(255, 230, 221);
  min-height: 100vh;
  & .nav {
    width: 300px;
  }
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
  const [articles, setArticles] = useState<Article[]>([]);
  const [user, setUser] = useState<User>(Lambda);
  const [userIsLogged, setUserIsLogged] = useState<boolean>(false);
  const [state, setState] = useState<boolean>(false);
  const { inventaires, historiques } = useDonnee(state);

  const handle = () => {
    setState(!state);
    console.log(state);
  };

  useEffect(() => {
    if (localStorage.getItem("user_token") === "roger") {
      setUserIsLogged(true);
      setUser(Roger);
    }
  }, []);

  useEffect(() => {
    ArticleFireService.getArticles().then((articles) => {
      setArticles(articles);
    });
  }, []);

  const contextValue: AppContextValue = {
    user: user,
    articles: articles,
    setArticles: setArticles,
  };

  return userIsLogged && user !== null ? (
    <AppContext.Provider value={contextValue}>
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
          />
        </Pages>
      </div>
    </AppContext.Provider>
  ) : (
    <AppContext.Provider value={contextValue}>
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
          />
        </Pages>
      </div>
    </AppContext.Provider>
  );
};

export default App;
