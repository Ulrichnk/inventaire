import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { Achat, Article, Historique, Inventaire, Vente } from "./Types";
import useDonnee from "./useDonnee";

type typeContext = {
  articles: Article[];
  setArticles: Dispatch<SetStateAction<Article[]>>;
  inventaires: Inventaire[];
  setInventaires: Dispatch<SetStateAction<Inventaire[]>>;
  historiques: Historique[];
  setHistoriques: Dispatch<SetStateAction<Historique[]>>;
  achats: Achat[];
  setAchats: Dispatch<SetStateAction<Achat[]>>;
  ventes: Vente[]; // Remplacez "achats" par "ventes"
  setVentes: React.Dispatch<React.SetStateAction<Vente[]>>;
};

const invContext = createContext<typeContext | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(invContext);
  if (!context) {
    throw new Error(
      "useAppContext must be used within a Provider with value={context}"
    );
  }

  return context;
};
export const InvProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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
  } = useDonnee(false);
  return (
    <invContext.Provider
      value={{
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
      }}
    >
      {children}
    </invContext.Provider>
  );
};
