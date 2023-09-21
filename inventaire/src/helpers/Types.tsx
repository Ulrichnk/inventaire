export type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};
export type choix = {
  name: string;
  value: string;
};

export type Form = {
  name?: Field;
  surname?: Field;
  email: Field;
  number?: Field;
  password: Field;
  address?: Field;
  journalist_state?: Field;
  driver_state?: Field;
};

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
};

export type Product = {
  id: number;
  stock: number;
  description: string;
  state: string;
  price: number;
  id_productor: number;
  url_img: string;
  name: string;
};

export type Article = {
  id: number;
  id_user?: number;
  nom: string;
  prix_achat: number;
  prix_vente: number;
  created_at: Date;
};
export type Inventaire = {
  id: number;
  id_article: number;
  id_historique: number;
  stock_depart: number;
  stock_achat: number;
  stock_restant: number;
};

export type Historique = {
  id: number;
  date_debut: string;
  date_fin: string;
};

export const Roger: User = {
  id: 1,
  name: "Kaptchuang",
  surname: "Roger",
  email: "roger@mail.com",
  password: "bametcha241",
};

export const Junior: User = {
  id: 2,
  name: "Junior",
  surname: "Junior",
  email: "junior@mail.com",
  password: "123456789",
};

export const Lambda: User = {
  id: 3,
  name: "Lambda",
  surname: "Lambda",
  email: "lambda@mail.com",
  password: "123456789",
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export type Achat = {
  id: number;
  id_article: number;
  valeur_achat: number;
  date_ajout: string;
};
export type Vente = {
  id: number;
  id_article: number;
  valeur_vente: number;
  date_vente: string;
};

export const fusionVente = (
  ventes: Vente[],
  idArticle: number,
  dateDebut: string,
  dateFin: string
): number => {
  const h = (
    ventes: Vente[],
    idArticle: number,
    dateDebut: string,
    dateFin: string
  ): Vente[] => {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);

    return ventes.filter((vente) => {
      const venteDate = new Date(vente.date_vente);
      return (
        vente.id_article === idArticle && venteDate >= debut && venteDate <= fin
      );
    });
  };
  const calculerSommeValeursVente = (ventes: Vente[]): number => {
    return ventes.reduce((somme, vente) => somme + vente.valeur_vente, 0);
  };

  // Exemple d'utilisation
  return calculerSommeValeursVente(h(ventes, idArticle, dateDebut, dateFin));
};

const getAchatsByArticleIdAndDates = (
  achats: Achat[],
  idArticle: number,
  dateDebut: string,
  dateFin: string
): Achat[] => {
  const debut = new Date(dateDebut);
  const fin = new Date(dateFin);

  return achats.filter((achat) => {
    const achatDate = new Date(achat.date_ajout);
    return (
      achat.id_article === idArticle && achatDate >= debut && achatDate <= fin
    );
  });
};

const calculerSommeValeursAchat = (achats: Achat[]): number => {
  return achats.reduce((somme, achat) => somme + achat.valeur_achat, 0);
};

export const fusionAchat = (
  achats: Achat[],
  idArticle: number,
  dateDebut: string,
  dateFin: string
): number => {
  const achatsFiltres = getAchatsByArticleIdAndDates(
    achats,
    idArticle,
    dateDebut,
    dateFin
  );
  return calculerSommeValeursAchat(achatsFiltres);
};
