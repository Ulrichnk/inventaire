import { Dispatch, SetStateAction } from "react";
import { Article, Historique, Inventaire } from "./Types";
import {
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"; // Import des fonctions Firestore nécessaires
import { db } from "./firebase-config";

export default class localServices {
  static getArticles(articles: Article[]): Article[] {
    return articles;
  }
  static getArticle(id: number, articles: Article[]): Article | undefined {
    return articles.find((art) => id === art.id);
  }

  static async updateArticle(
    article: Article,
    setArticles: Dispatch<SetStateAction<Article[]>>
  ): Promise<boolean> {
    try {
      const docRef = doc(db, "articles");
      await setDoc(docRef, article);
      setArticles((prevArticles) => {
        const updatedArticles = prevArticles.map((art) =>
          art.id === article.id ? article : art
        );
        return updatedArticles;
      });

      return true;
    } catch (error) {
      this.handleError(error as Error);
      return false;
    }
  }

  static async deleteArticle(
    id: number,
    articles: Article[],
    setArticles: Dispatch<SetStateAction<Article[]>>
  ): Promise<boolean> {
    try {
      const querySnapshot = await getDocs(collection(db, "articles"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.id === id) {
          deleteDoc(doc.ref);
        }
      });
    } catch (error) {
      this.handleError(error as Error);
      return false;
    }
    const copy = { ...articles };
    setArticles(copy.filter((art) => art.id !== id));
    return true;
  }

  static async addArticle(
    article: Article,
    articles: Article[],
    setArticles: Dispatch<SetStateAction<Article[]>>
  ): Promise<boolean> {
    const modifiedArticle = { ...article };
    modifiedArticle.created_at = new Date(article.created_at);

    try {
      const articlesRef = collection(db, "articles");
      const querySnapshot = await getDocs(articlesRef);
      const newSize = querySnapshot.size + 1; // Taille actuelle + 1

      const newArticleData = {
        ...modifiedArticle,
        id: newSize,
      };

      await addDoc(articlesRef, newArticleData);

      // Mettre à jour localement les articles
      setArticles((prevArticles) => [...prevArticles, modifiedArticle]);

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static searchArticle(term: string, articles: Article[]): Article[] {
    const lowerCaseTerm = term.toLowerCase(); // Convertir le terme en minuscules
    const results = articles.filter(
      (art) => art.nom?.toLowerCase().includes(lowerCaseTerm) // Convertir le nom en minuscules
    );
    return results;
  }

  static getHistorique(
    date_debut: string,
    date_fin: string,
    historiques: Historique[]
  ): Historique | null {
    const lowerCaseDateDebut = date_debut.toLowerCase(); // Convertir la date de début en minuscules
    const lowerCaseDateFin = date_fin.toLowerCase(); // Convertir la date de fin en minuscules

    const historiqueTrouve = historiques.find(
      (art) =>
        art.date_debut.toLowerCase() === lowerCaseDateDebut &&
        art.date_fin.toLowerCase() === lowerCaseDateFin
    );

    return historiqueTrouve || null;
  }

  //----------------------------------------------------------------
  static getHistorique1(
    date_debut: string,
    historiques: Historique[]
  ): Historique | null {
    const lowerCaseDateDebut = date_debut.toLowerCase(); // Convertir la date de début en minuscules

    const historiqueTrouve = historiques.find(
      (art) => art.date_fin.toLowerCase() === lowerCaseDateDebut
    );

    return historiqueTrouve || null;
  }

  static async getInventaire(
    id_hist: number,
    id_article: number,
    inventaires: Inventaire[]
  ): Promise<Inventaire | null> {
    return (
      inventaires.find(
        (art) => id_article === art.id_article && id_hist === art.id_historique
      ) || null
    );
  }

  static async addHistorique(
    date_debut: string,
    date_fin: string,
    setHistoriques: Dispatch<SetStateAction<Historique[]>>
  ): Promise<Historique | null> {
    try {
      const historiquesRef = collection(db, "historiques");

      // Obtenir la taille actuelle de la collection historique
      const querySnapshot = await getDocs(historiquesRef);
      const historiqueSize = querySnapshot.size;

      // Créer un nouvel objet historique avec les dates au format Timestamp
      const newHistorique = {
        id: historiqueSize + 1,
        date_debut: new Date(date_debut),
        date_fin: new Date(date_fin),
      };

      // Mettre à jour localement les historiques
      setHistoriques((prevHistoriques) => [
        ...prevHistoriques,
        {
          id: historiqueSize + 1,
          date_debut,
          date_fin,
        },
      ]);

      // Ajouter le nouvel historique à la collection avec l'ID calculé dans Firestore
      await addDoc(historiquesRef, newHistorique);

      // Renvoyer l'objet Historique avec l'ID calculé
      return {
        id: historiqueSize + 1,
        date_debut,
        date_fin,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async addInventaire(
    id_historique: number,
    id_article: number,
    stock_achat: number,
    stock_restant: number,
    stock_depart: number,
    setInventaires: Dispatch<SetStateAction<Inventaire[]>>
  ): Promise<Inventaire | null> {
    try {
      const inventairesRef = collection(db, "inventaires");

      // Obtenir la taille actuelle de la collection inventaire
      const inventairesQuerySnapshot = await getDocs(inventairesRef);
      const inventaireSize = inventairesQuerySnapshot.size;

      // Générer un nouvel ID pour l'inventaire
      const newInventaireId = inventaireSize + 1;

      // Créer un nouvel inventaire
      const newInventaire: Inventaire = {
        id: newInventaireId,
        id_historique: id_historique,
        id_article: id_article,
        stock_achat: stock_achat,
        stock_restant: stock_restant,
        stock_depart: stock_depart,
        // Ajoutez ici d'autres propriétés de l'inventaire
      };

      // Mettre à jour localement les inventaires
      setInventaires((prevInventaires) => [...prevInventaires, newInventaire]);

      // Ajouter le nouvel inventaire à la collection avec le nouvel ID dans Firestore
      await addDoc(inventairesRef, newInventaire);

      return newInventaire;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }
  static handleError(error: Error): void {
    console.log(error);
  }
}
