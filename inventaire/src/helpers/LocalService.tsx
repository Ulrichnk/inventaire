import { Dispatch, SetStateAction } from "react";
import { Achat, Article, Historique, Inventaire, Vente } from "./Types";
import {
  deleteDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"; // Import des fonctions Firestore nécessaires
import { db } from "./firebase-config";

export default class localServices {
  static isDev = () => {
    if (process.env.REACT_APP_DEV === "false") {
      return false;
    } else {
      return true;
    }
    // return (!process.env.NODE_ENV || process.env.NODE_ENV === "development");
  };
  static async getArticles(): Promise<Article[]> {
    try {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const articles = querySnapshot.docs.map((doc) => doc.data() as Article);
      return articles;
    } catch (error) {
      this.handleError(error as Error);
      return [];
    }
  }

  static getArticle(id: number, articles: Article[]): Article | undefined {
    return articles.find((art) => id === art.id);
  }

  static async updateArticle(
    article: Article,
    articles: Article[],
    setArticles: Dispatch<SetStateAction<Article[]>>
  ): Promise<boolean> {
    try {
      //on supprime l'article
      const id = article.id;
      const modifiedArticle = { ...article };
      modifiedArticle.created_at = new Date(article.created_at);
      const a = await this.deleteArticle(article.id, articles, setArticles);
      const articlesRef = collection(db, "articles");
      const newArticleData = {
        ...modifiedArticle,
        id: id,
      };
      if (this.isDev()) {
        await addDoc(articlesRef, newArticleData);
      }
      // Mettre à jour localement les articles
      if (typeof a !== "boolean") {
        setArticles((prevArticles) => [...prevArticles, modifiedArticle]); // Met à jour l'état local des articles en remplaçant l'article mis à jour
        return true; // Indique que la mise à jour a réussi
      }
      return false;
    } catch (error) {
      this.handleError(error as Error);
      return false; // Indique que la mise à jour a échoué
    }
  }

  static async deleteArticle(
    id: number,
    articles: Article[],
    setArticles: Dispatch<SetStateAction<Article[]>>
  ): Promise<Article[] | boolean> {
    try {
      if (this.isDev()) {
        // Recherche l'article dans Firestore
        const q = query(collection(db, "articles"), where("id", "==", id));
        const querySnapshot = await getDocs(q);

        // Supprime l'article s'il existe
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
      }

      // Met à jour l'état local en supprimant l'article
      const updatedArticles = articles.filter((art) => art.id !== id);
      setArticles(updatedArticles);

      return updatedArticles; // Renvoie la nouvelle liste d'articles après la suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
      return false; // Indique que la suppression a échoué
    }
  }

  static async addArticle(
    article: Article,
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
      if (this.isDev()) {
        await addDoc(articlesRef, newArticleData);
      }

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
    console.log("l inventaire fourni", inventaires);

    return (
      inventaires.find(
        (art) => id_article === art.id_article && id_hist === art.id_historique
      ) || null
    );
  }

  static async addHistorique(
    date_debut: string,
    date_fin: string,
    historiques: Historique[],
    setHistoriques: Dispatch<SetStateAction<Historique[]>>
  ): Promise<Historique | null> {
    try {
      // Convertir les dates en objets Date

      // Vérifier si les dates correspondent à celles déjà présentes dans les historiques
      const isDuplicate = historiques.some((historique) => {
        const parsedDateDebut = new Date(date_debut).getTime();
        const parsedDateFin = new Date(date_fin).getTime();

        const historiqueDateDebut = new Date(historique.date_debut).getTime();
        const historiqueDateFin = new Date(historique.date_fin).getTime();

        return (
          parsedDateDebut === historiqueDateDebut &&
          parsedDateFin === historiqueDateFin
        );
      });

      console.log("valeur is duplicate", isDuplicate);

      if (isDuplicate) {
        console.error(
          "Les dates correspondent à des dates déjà présentes dans les historiques."
        );
        return null; // Dates correspondent à des dates existantes, retourne null
      }
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
      if (this.isDev()) {
        await addDoc(historiquesRef, newHistorique);
      }

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
      if (this.isDev()) {
        await addDoc(inventairesRef, newInventaire);
      }

      return newInventaire;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async addAchat(
    id_article: number,
    valeur_achat: number,
    date_ajout: string,
    setAchats: Dispatch<SetStateAction<Achat[]>>
  ): Promise<Achat | null> {
    try {
      const achatsRef = collection(db, "achats");
      // Obtenir la taille actuelle de la collection achats
      const achatsQuerySnapshot = await getDocs(achatsRef);
      const achatSize = achatsQuerySnapshot.size;
      // Générer un nouvel ID pour l'achat
      const newAchatId = achatSize + 1;
      // Créer un nouvel achat
      const newAchat: Achat = {
        id_article: id_article,
        id: newAchatId,
        valeur_achat: valeur_achat,
        date_ajout: date_ajout,
      };
      // Mettre à jour localement les achats
      setAchats((prevAchats) => [...prevAchats, newAchat]);
      // Ajouter le nouvel achat à la collection avec le nouvel ID dans Firestore
      if (this.isDev()) {
        await addDoc(achatsRef, newAchat);
      }

      return newAchat;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getAchatByIdBydate(
    id_article: number,
    date: string,
    achats: Achat[]
  ): Promise<Achat[] | null> {
    try {
      const lowerCaseDateDebut = date.toLowerCase(); // Convertir la date de début en minuscules

      const achatsTrouve: Achat[] = achats.filter(
        (art) =>
          art.date_ajout.toLowerCase() === lowerCaseDateDebut &&
          art.id_article === id_article
      );

      return achatsTrouve;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getAchats(): Promise<Achat[]> {
    try {
      const achatsRef = collection(db, "achats");
      const querySnapshot = await getDocs(achatsRef);

      const achats: Achat[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id_article: data.id_article,
          id: data.id,
          valeur_achat: data.valeur_achat,
          date_ajout: data.date_ajout,
        };
      });

      return achats;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async addVente(
    id_article: number,
    valeur_vente: number,
    date_vente: string,
    setVentes: Dispatch<SetStateAction<Vente[]>>
  ): Promise<Vente | null> {
    try {
      const ventesRef = collection(db, "ventes");
      // Obtenir la taille actuelle de la collection ventes
      const ventesQuerySnapshot = await getDocs(ventesRef);
      const venteSize = ventesQuerySnapshot.size;
      // Générer un nouvel ID pour la vente
      const newVenteId = venteSize + 1;
      // Créer une nouvelle vente
      const newVente: Vente = {
        id_article: id_article,
        id: newVenteId,
        valeur_vente: valeur_vente,
        date_vente: date_vente,
      };
      // Mettre à jour localement les ventes
      setVentes((prevVentes) => [...prevVentes, newVente]);
      // Ajouter la nouvelle vente à la collection avec le nouvel ID dans Firestore
      if (this.isDev()) {
        await addDoc(ventesRef, newVente);
      }

      return newVente;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getVenteByIdByDate(
    id_article: number,
    date: string,
    ventes: Vente[]
  ): Promise<Vente[] | null> {
    try {
      const lowerCaseDate = date.toLowerCase(); // Convertir la date en minuscules

      const ventesTrouvees: Vente[] = ventes.filter(
        (vente) =>
          vente.date_vente.toLowerCase() === lowerCaseDate &&
          vente.id_article === id_article
      );

      return ventesTrouvees;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getVentes(): Promise<Vente[]> {
    try {
      const ventesRef = collection(db, "ventes");
      const querySnapshot = await getDocs(ventesRef);

      const ventes: Vente[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id_article: data.id_article,
          id: data.id,
          valeur_vente: data.valeur_vente,
          date_vente: data.date_vente,
        };
      });

      return ventes;
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
