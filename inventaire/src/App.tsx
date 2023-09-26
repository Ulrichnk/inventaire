import React, {
  FunctionComponent,
  createContext,
  useEffect,
  useState,
} from "react";
import NavBar from "./components/navigations/NavBar";
import AllPages from "./components/navigations/AllPages";
import { Article, Lambda, Roger, User } from "./helpers/Types";
import { useAppContext } from "./helpers/AppContext";
import Footer from "./components/navigations/footer";

// const Pages = styled.div`
//   background-color: rgb(255, 230, 221);
//   min-height: 100vh;

//   & table {
//     width: 100px;
//   }
// `;
type AppContextValue = {
  user: User;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
};

export const AppContext = createContext<AppContextValue | null>(null);
const App: FunctionComponent = () => {
  const [user, setUser] = useState<User>(Lambda);
  const [userIsLogged, setUserIsLogged] = useState<boolean>(false);
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
  } = useAppContext();



  useEffect(() => {
    if (localStorage.getItem("user_token") === "roger") {
      setUserIsLogged(true);
      setUser(Roger);
    }
  }, [ventes]);

  return userIsLogged && user !== null ? (
    <div>
      <NavBar userIsLogged={true} />
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
      <Footer/>
    </div>
  ) : (
    <div>
      <NavBar userIsLogged={false} />
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
      <Footer/>
    </div>
  );
};

export default App;
