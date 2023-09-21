import { Achat, Article, Vente } from "./Types";
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

export let useArticle: Article[] = [
  {
    id: 0,
    nom: "cahier 250 pages",
    prix_achat: 100,
    prix_vente: 500,
    created_at: new Date(),
  },
  {
    id: 2,
    nom: "cahier 350 pages",
    prix_achat: 200,
    prix_vente: 700,
    created_at: new Date(),
  },
];
export let ventes:Vente[]=[];
export let achats:Achat[]=[];

export function add(a: Article): Article {
  const id: number = useArticle.length;
  a.id = id + 1;
  console.log();
  useArticle = [...useArticle, a];
  return a;
}

export default class ArticleFireService {
  static articles: Article[] = useArticle;
  static ventes:Vente[]=[];
  static achats:Achat[]=[];

  static isDev = () => {
    if (process.env.REACT_APP_DEV === "false") {
      return false;
    } else {
      return true;
    }
    // return (!process.env.NODE_ENV || process.env.NODE_ENV === "development");
  };

  static url = `${process.env.REACT_APP_BACKEND_URL}`;

  static async getArticles(): Promise<Article[]> {
    if (this.isDev()) {
      try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        const articles = querySnapshot.docs.map((doc) => doc.data() as Article);
        return articles;
      } catch (error) {
        this.handleError(error);
        return [];
      }
    } else {
      return this.articles;
    }
  }
  static async getArticle(id: number): Promise<Article | null | undefined> {
    if (this.isDev()) {
        try {
            const querySnapshot = await getDocs(collection(db, "articles"));
            const article = querySnapshot.docs.find(doc => doc.data().id === id);

            if (article) {
                return article.data() as Article;
            } else {
                return null;
            }
        } catch (error) {
            this.handleError(error);
            return null;
        }
    } else {
        return this.articles.find(art => art.id === id);
    }
}


  static async updateArticle(article: Article): Promise<Article> {
    if (this.isDev()) {
      try {
        const docRef = doc(db, "articles");
        await setDoc(docRef, article);

        return article;
      } catch (error) {
        this.handleError(error);
        return article;
      }
    } else {
      const { id } = article;
      const index = this.articles.findIndex((art) => art.id === id);
      this.articles[index] = article;
      return article;
    }
  }
  static async deleteArticle(id: number): Promise<{}> {
    if (this.isDev()) {
      try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.id === id) {
            deleteDoc(doc.ref);
          }
        });

        return {};
      } catch (error) {
        this.handleError(error);
        return {};
      }
    } else {
      this.articles = this.articles.filter((art) => art.id !== id);
      return {};
    }
  }

  static async addArticle(article: Article): Promise<Article> {
    const modifiedArticle = { ...article };
    modifiedArticle.created_at = new Date(article.created_at);

    try {
      if (this.isDev()) {
        const articlesRef = collection(db, "articles");
        const querySnapshot = await getDocs(articlesRef);
        const newSize = querySnapshot.size + 1; // Taille actuelle + 1

        const newArticleData = {
          ...modifiedArticle,
          id: newSize,
        };

        await addDoc(articlesRef, newArticleData);
        return newArticleData;
      } else {
        this.articles.push(modifiedArticle);
        return modifiedArticle;
      }
    } catch (error) {
      this.handleError(error as Error);
      throw error;
    }
  }

  static async searchArticle(term: string): Promise<Article[]> {
    if (this.isDev()) {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "articles"), where("nom", ">=", term))
        );
        const results = querySnapshot.docs.map((doc) => doc.data() as Article);
        return results;
      } catch (error) {
        this.handleError(error);
        return [];
      }
    } else {
      const results = this.articles.filter((art) => art.nom?.includes(term));
      return results;
    }
  }
  static async getVentes(): Promise<Vente[]> {
    if (this.isDev()) {
      try {
        const querySnapshot = await getDocs(collection(db, "ventes"));
        const articles = querySnapshot.docs.map((doc) => doc.data() as Vente);
        return articles;
      } catch (error) {
        this.handleError(error);
        return [];
      }
    } else {
      return this.ventes;
    }
  }
  static async getAchats(): Promise<Achat[]> {
    if (this.isDev()) {
      try {
        const querySnapshot = await getDocs(collection(db, "achats"));
        const articles = querySnapshot.docs.map((doc) => doc.data() as Achat);
        return articles;
      } catch (error) {
        this.handleError(error);
        return [];
      }
    } else {
      return this.achats;
    }
  }


  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }
  static handleError(error: Error | any): void {
    console.log(error);
  }
}
