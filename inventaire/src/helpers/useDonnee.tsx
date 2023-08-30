import { useEffect } from "react";
import { useState } from "react";
import { Article, Historique, Inventaire } from "./Types";
import ArticleFireService from "./ArticleFire";
import InventaireFireService from "./InventaireFire";

type retour = {
  articles: Article[];
  historiques: Historique[];
  inventaires: Inventaire[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  setHistoriques: React.Dispatch<React.SetStateAction<Historique[]>>;
  setInventaires: React.Dispatch<React.SetStateAction<Inventaire[]>>;
};

const useDonnee = (state: boolean): retour => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [historiques, setHistoriques] = useState<Historique[]>([]);
  const [inventaires, setInventaires] = useState<Inventaire[]>([]);

  useEffect(() => {
    ArticleFireService.getArticles().then((articles) => {
      setArticles(articles);
    });

    InventaireFireService.getHistoriques().then((res) => {
      setHistoriques(res);
    });

    InventaireFireService.getInventaires().then((res) => {
      setInventaires(res);
    });
  }, [state]);

  return {
    articles,
    historiques,
    inventaires,
    setArticles,
    setHistoriques,
    setInventaires,
  };
};

export default useDonnee;
