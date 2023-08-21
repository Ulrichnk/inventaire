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
  id: number|undefined;
  id_user?: number|undefined;
  nom: string|undefined;
  prix_achat: number|undefined;
  prix_vente: number|undefined;
  created_at: Date;
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
