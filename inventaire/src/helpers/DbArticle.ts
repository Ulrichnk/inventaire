import { Article } from "./Types";
import {
  doc,
  getDoc,
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

export function add(a: Article): Article {
  const id: number = useArticle.length;
  a.id = id + 1;
  console.log();
  useArticle = [...useArticle, a];
  return a;
}

export default class ArticleService {
  static articles: Article[] = useArticle;

  static isDev = () => {
    if (process.env.REACT_APP_DEV === "false") {
      return false;
    } else {
      return true;
    }
  };

  static url = `${process.env.REACT_APP_BACKEND_URL}`;

  static getArticles(): Promise<Article[]> {
    if (this.isDev()) {
      return fetch(`${process.env.REACT_APP_BACKEND_URL}/articles`)
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    } else {
      return new Promise((resolve) => {
        resolve(this.articles);
      });
    }
  }

  static getArticle(id: number): Promise<Article | null | undefined> {
    if (this.isDev()) {
      return fetch(`${process.env.REACT_APP_BACKEND_URL}/articles/${id}`)
        .then((response) => response.json())
        .then((data) => (this.isEmpty(data) ? null : data))
        .catch((error) => this.handleError(error));
    }

    return new Promise((resolve) => {
      resolve(this.articles.find((art) => id === art.id));
    });
  }

  static updateArticle(article: Article): Promise<Article> {
    if (this.isDev()) {
      return fetch(
        `${process.env.REACT_APP_BACKEND_URL}/articles/${article.id}`,
        {
          method: "PUT",
          body: JSON.stringify(article),
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }
    return new Promise((resolve) => {
      const { id } = article;
      const index = this.articles.findIndex((art) => art.id === id);
      this.articles[index] = article;
      resolve(article);
    });
  }

  static deleteArticle(article: Article): Promise<{}> {
    if (this.isDev()) {
      return fetch(
        `${process.env.REACT_APP_BACKEND_URL}/articles/${article.id}`,
        {
          method: "DELETE",
          body: JSON.stringify(article),
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }
    return new Promise((resolve) => {
      const { id } = article;
      this.articles = this.articles.filter((art) => art.id !== id);
      resolve({});
    });
  }

  static async addArticle(article: Article): Promise<Article> {
    const modifiedArticle = { ...article };
    modifiedArticle.created_at = new Date(article.created_at);

    if (this.isDev()) {
      try {
        const articles = await this.getArticles();
        modifiedArticle.id = articles.length;

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/articles`,
          {
            method: "POST",
            body: JSON.stringify(modifiedArticle),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add article");
        }

        const addedArticle = await response.json();
        return addedArticle;
      } catch (error) {
        this.handleError(error as Error);
        throw error;
      }
    } else {
      return new Promise((resolve) => {
        this.articles.push(modifiedArticle);
        resolve(modifiedArticle);
      });
    }
  }

  static searchArticle(term: string): Promise<Article[]> {
    if (this.isDev()) {
      return fetch(`${process.env.REACT_APP_BACKEND_URL}/articles?q=${term}`)
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }

    return new Promise((resolve) => {
      const results = this.articles.filter((art) => art.nom?.includes(term));
      resolve(results);
    });
  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }
  static handleError(error: Error): void {
    console.log(error);
  }
}

export class ArticleFireService {
  static articles: Article[] = useArticle;

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
        const docRef = doc(db, "articles", id.toString());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          return docSnap.data() as Article;
        } else {
          return null;
        }
      } catch (error) {
        this.handleError(error);
        return null;
      }
    } else {
      return this.articles.find((art) => id === art.id);
    }
  }

  static async updateArticle(article: Article): Promise<Article> {
    if (this.isDev()) {
      try {
        const docRef = doc(db, "articles", article.id.toString());
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

  static async deleteArticle(article: Article): Promise<{}> {
    if (this.isDev()) {
      try {
        const docRef = doc(db, "articles", article.id.toString());
        await deleteDoc(docRef);

        return {};
      } catch (error) {
        this.handleError(error);
        return {};
      }
    } else {
      const { id } = article;
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

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }
  static handleError(error: Error | any): void {
    console.log(error);
  }
}
