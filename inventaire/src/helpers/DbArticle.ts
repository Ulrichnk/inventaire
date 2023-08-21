import { Article } from "./Types";

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

export function add(a: Article) {
  const id: number = useArticle.length;
  a.id = id + 1;
  console.log();
  useArticle = [...useArticle, a];
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
      return fetch(`${process.env.REACT_APP_BACKEND_URL}`)
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
      return fetch(`${process.env.REACT_APP_BACKEND_URL}/${id}`)
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
      return fetch(`${process.env.REACT_APP_BACKEND_URL}/${article.id}`, {
        method: "PUT",
        body: JSON.stringify(article),
        headers: { "Content-Type": "application/json" },
      })
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
      return fetch(`${process.env.REACT_APP_BACKEND_URL}/${article.id}`, {
        method: "DELETE",
        body: JSON.stringify(article),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }
    return new Promise((resolve) => {
      const { id } = article;
      this.articles = this.articles.filter((art) => art.id !== id);
      resolve({});
    });
  }

  static addArticle(article: Article): Promise<Article> {
    article.created_at = new Date(article.created_at);
    if (this.isDev()) {
      return fetch(`${process.env.REACT_APP_BACKEND_URL}/${article.id}`, {
        method: "POST",
        body: JSON.stringify(article),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }
    add(article);
    return new Promise((resolve) => {
      this.articles.push(article);
      resolve(article);
    });
  }

  static searchArticle(term: string): Promise<Article[]> {
    if (this.isDev()) {
      return fetch(`${process.env.REACT_APP_BACKEND_URL}?q=${term}`)
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
