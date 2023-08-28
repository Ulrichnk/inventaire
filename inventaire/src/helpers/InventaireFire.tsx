import { Historique, Inventaire, formatDate } from "./Types";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  addDoc,
} from "firebase/firestore"; // Import des fonctions Firestore nécessaires
import { db } from "./firebase-config";

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

export default class InventaireFireService {
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

  static async getHistoriques(): Promise<Historique[]> {
    try {
      if (this.isDev()) {
        const historiquesRef = collection(db, "historiques");
        const querySnapshot = await getDocs(historiquesRef);

        const historiques = querySnapshot.docs.map((doc) => {
          const id = doc.data().id;
          const date_debut = formatDate(
            (doc.data().date_debut as Timestamp).toDate()
          );
          const date_fin = formatDate(
            (doc.data().date_fin as Timestamp).toDate()
          );

          return {
            id,
            date_debut,
            date_fin,
          };
        });

        return historiques;
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
        const inventairesRef = collection(db, "inventaire");
        const querySnapshot = await getDocs(
          query(inventairesRef, where("id_article", "==", id_article))
        );
        const inventaires = querySnapshot.docs.map(
          (doc) => doc.data() as Inventaire
        );
        return inventaires;
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
        const inventaires = await this.getInventaires(id_article);
        const inventaireTrouve = inventaires.find(
          (inventaire) => id_hist === inventaire.id_historique
        );
        return inventaireTrouve || null;
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

  static async addHistorique(
    date_debut: string,
    date_fin: string
  ): Promise<Historique | null> {
    try {
      if (this.isDev()) {
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

        // Ajouter le nouvel historique à la collection avec l'ID calculé
        await addDoc(historiquesRef, newHistorique);

        // Renvoyer l'objet Historique avec l'ID calculé
        return {
          id: historiqueSize + 1,
          date_debut,
          date_fin,
        };
      } else {
        // Logique pour l'environnement de production
        return null;
      }
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  static async addInventaire(
    
    id_hist: number,
    id_article: number,
    stock_achat: number,
    stock_restant: number,
    stock_depart: number
  ): Promise<Inventaire | null> {
    try {
      if (this.isDev()) {
        const inventairesRef = collection(db, "inventaire");

        // Obtenir la taille actuelle de la collection inventaire
        const inventairesQuerySnapshot = await getDocs(
          query(inventairesRef, where("id_article", "==", id_article))
        );
        const inventaireSize = inventairesQuerySnapshot.size + 1;

        // Générer un nouvel ID pour l'inventaire
        const newInventaireId = inventaireSize + 1;

        // Créer un nouvel inventaire
        const newInventaire: Inventaire = {
          id: newInventaireId,
          id_historique: id_hist,
          id_article: id_article,
          stock_achat: stock_achat,
          stock_restant: stock_restant,
          stock_depart: stock_depart,
          // Ajoutez ici d'autres propriétés de l'inventaire
        };

        // Ajouter le nouvel inventaire à la collection
        await addDoc(inventairesRef, newInventaire);

        return newInventaire;
      } else {
        // Logique pour l'environnement de production
        return null;
      }
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error | any): void {
    console.log(error);
  }
}
