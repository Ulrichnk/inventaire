import { Historique, Inventaire } from "./Types";

export let useInventaire: Inventaire[] = [
  {
    id: 0,
    id_historique: 0,
    id_article: 1,
    stock_depart: 0,
    stock_achat: 0,
    stock_restant: 0,
  },
  {
    id: 1,
    id_historique: 0,
    id_article: 2,
    stock_depart: 0,
    stock_achat: 0,
    stock_restant: 0,
  },
  {
    id: 2,
    id_historique: 0,
    id_article: 3,
    stock_depart: 0,
    stock_achat: 0,
    stock_restant: 0,
  },
];
export let useHistorique: Historique[] = [
  // This array will hold the data for the Historique component
  {
    id: 0,
    // This will hold the date of the first entry
    date_debut: "2023-01-16",
    // This will hold the date of the last entry
    date_fin: "2023-02-16",
  },
];

export function add(a: Inventaire) {
  const id: number = useInventaire.length;
  a.id = id + 1;
  console.log();
  useInventaire = [...useInventaire, a];
}

export default class InventaireService {
  static inventaire: Inventaire[] = useInventaire;
  static historique: Historique[] = useHistorique;
  static isDev = () => {
    if (process.env.REACT_APP_DEV === "false") {
      return false;
    } else {
      return true;
    }
    // return (!process.env.NODE_ENV || process.env.NODE_ENV === "development");
  };

  static url = process.env.REACT_APP_BACKEND_URL1;

  static async getHistoriques(): Promise<Historique[]> {
    try {
      if (this.isDev()) {
        const response = await fetch(`${this.url}/historique`);
        return response.json();
      } else {
        return this.historique;
      }
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  static async getHistorique(
    date_debut: string,
    date_fin: string
  ): Promise<Historique | null> {
    try {
      const historiques = await this.getHistoriques();

      const historiqueTrouve = historiques.find(
        (art) => art.date_debut === date_debut && art.date_fin === date_fin
      );

      return historiqueTrouve || null;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  static async getInventaires(id_article: number): Promise<Inventaire[]> {
    if (this.isDev()) {
      try {
        const response = await fetch(`${this.url}/inventaire`);
        const data :Inventaire[]= await response.json();
        return data.filter((art) => id_article === art.id_article);
      } catch (error) {
        this.handleError(error);
        return [];
      }
    }

    return this.inventaire.filter((art) => id_article === art.id_article);
  }

  static async getInventaire(
    id_hist: number,
    id_article: number
  ): Promise<Inventaire | null> {
    if (this.isDev()) {
      try {
        const data = await this.getInventaires(id_article);
        return (
          data.find((inventaire) => id_hist === inventaire.id_historique) ||
          null
        );
      } catch (error) {
        this.handleError(error);
        return null;
      }
    }

    return (
      this.inventaire.find(
        (art) => id_article === art.id_article && id_hist === art.id_historique
      ) || null
    );
  }

  // static getInventaires(id_article: number): Promise<Inventaire[]> {
  //   let inv: Inventaire[] = this.inventaire;
  //   if (this.isDev()) {
  //     fetch(`${this.url}/inventaire`)
  //       .then((response) => response.json())
  //       .then((data) => (inv = data))
  //       .catch((error) => this.handleError(error));

  //     return new Promise((resolve) => {
  //       resolve(inv.filter((art) => id_article === art.id_article));
  //     });
  //   }

  //   return new Promise((resolve) => {
  //     resolve(this.inventaire.filter((art) => id_article === art.id_article));
  //   });
  // }

  // static getInventaire(
  //   id_hist: number,
  //   id_article: number
  // ): Promise<Inventaire | null | undefined> {
  //   if (this.isDev()) {
  //     // this.getInventaires(id_article)
  //     //   .then((response) => (inv = response))
  //     //   .then((data) =>
  //     //     data.find((inventaire) => id_hist === inventaire.id_historique)
  //     //   );

  //     return new Promise((resolve) => {
  //       resolve(
  //         this.getInventaires(id_article).then((data) =>
  //           data.find((inventaire) => id_hist === inventaire.id_historique)
  //         )
  //       );
  //     });
  //   }
  //   return new Promise((resolve) => {
  //     resolve(
  //       this.inventaire
  //         .filter((art) => id_article === art.id)
  //         .find((inventaire) => id_hist === inventaire.id_historique)
  //     );
  //   });
  // }

  // static updateArticle(article: Article): Promise<Article> {
  //   if (this.isDev()) {
  //     return fetch(`${process.env.REACT_APP_BACKEND_URL}/${article.id}`, {
  //       method: "PUT",
  //       body: JSON.stringify(article),
  //       headers: { "Content-Type": "application/json" },
  //     })
  //       .then((response) => response.json())
  //       .catch((error) => this.handleError(error));
  //   }
  //   return new Promise((resolve) => {
  //     const { id } = article;
  //     const index = this.articles.findIndex((art) => art.id === id);
  //     this.articles[index] = article;
  //     resolve(article);
  //   });
  // }

  // static deleteArticle(article: Article): Promise<{}> {
  //   if (this.isDev()) {
  //     return fetch(`${process.env.REACT_APP_BACKEND_URL}/${article.id}`, {
  //       method: "DELETE",
  //       body: JSON.stringify(article),
  //       headers: { "Content-Type": "application/json" },
  //     })
  //       .then((response) => response.json())
  //       .catch((error) => this.handleError(error));
  //   }
  //   return new Promise((resolve) => {
  //     const { id } = article;
  //     this.articles = this.articles.filter((art) => art.id !== id);
  //     resolve({});
  //   });
  // }

  // static addArticle(article: Article): Promise<Article> {
  //   article.created_at = new Date(article.created_at);
  //   if (this.isDev()) {
  //     return fetch(`${process.env.REACT_APP_BACKEND_URL}/${article.id}`, {
  //       method: "POST",
  //       body: JSON.stringify(article),
  //       headers: { "Content-Type": "application/json" },
  //     })
  //       .then((response) => response.json())
  //       .catch((error) => this.handleError(error));
  //   }
  //   add(article);
  //   return new Promise((resolve) => {
  //     this.articles.push(article);
  //     resolve(article);
  //   });
  // }

  // static searchArticle(term: string): Promise<Article[]> {
  //   if (this.isDev()) {
  //     return fetch(`${process.env.REACT_APP_BACKEND_URL}?q=${term}`)
  //       .then((response) => response.json())
  //       .catch((error) => this.handleError(error));
  //   }

  //   return new Promise((resolve) => {
  //     const results = this.articles.filter((art) => art.nom?.includes(term));
  //     resolve(results);
  //   });
  // }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }
  static handleError(error: Error | any): void {
    console.log(error);
  }
}
