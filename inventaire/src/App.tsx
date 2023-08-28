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
import ArticleService from "./helpers/DbArticle";
import ArticleFireService from "./helpers/ArticleFire";

const Pages = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  background-color: rgb(255, 230, 221);
`;

type AppContextValue = {
  user: User;
  articles: Article[];
};

export const AppContext = createContext<AppContextValue | null>(null);
const App: FunctionComponent = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [user, setUser] = useState<User>(Lambda);
  const [userIsLogged, setUserIsLogged] = useState<boolean>(false);

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
  };

  return userIsLogged && user !== null ? (
    <AppContext.Provider value={contextValue}>
      {" "}
      <Pages>
        <NavBar userIsLogged={true} />
        <AllPages
          userIsLogged={true}
          user={user}
          setUser={setUser}
          setUserIsLogged={setUserIsLogged}
        />
      </Pages>
    </AppContext.Provider>
  ) : (
    <AppContext.Provider value={contextValue}>
      <Pages>
        <NavBar userIsLogged={false} />
        <AllPages
          userIsLogged={false}
          user={null}
          setUser={setUser}
          setUserIsLogged={setUserIsLogged}
        />
      </Pages>
    </AppContext.Provider>
  );
};

export default App;
