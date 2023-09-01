import { useEffect } from "react";
import { useState } from "react";
import { Achat, Article, Historique, Inventaire } from "./Types";
import ArticleFireService from "./ArticleFire";
import InventaireFireService from "./InventaireFire";
import localServices from "./LocalService";

type retour = {
  articles: Article[];
  historiques: Historique[];
  inventaires: Inventaire[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  setHistoriques: React.Dispatch<React.SetStateAction<Historique[]>>;
  setInventaires: React.Dispatch<React.SetStateAction<Inventaire[]>>;
  achats: Achat[];
  setAchats: React.Dispatch<React.SetStateAction<Achat[]>>;
};

const useDonnee = (state: boolean): retour => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [historiques, setHistoriques] = useState<Historique[]>([]);
  const [inventaires, setInventaires] = useState<Inventaire[]>([]);
  const [achats, setAchats] = useState<Achat[]>([]);

  useEffect(() => {
    ArticleFireService.getArticles().then((articles) => {
      setArticles(articles.sort((a, b) => a.nom.localeCompare(b.nom)));
    });

    InventaireFireService.getHistoriques().then((res) => {
      setHistoriques(res);
    });

    InventaireFireService.getInventaires().then((res) => {
      setInventaires(res);
    });

    localServices.getAchats().then((res) => {
      setAchats(res);
    });
  }, [state]);

  return {
    articles,
    historiques,
    inventaires,
    setArticles,
    setHistoriques,
    setInventaires,
    achats,
    setAchats,
  };
};

export default useDonnee;
