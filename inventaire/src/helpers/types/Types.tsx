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
    address: string;
    number: string;
    journalist_state: boolean;
    driver_state: boolean;
    state?:boolean;
  };

  export type Product={
    id:number,
    stock:number,
    description:string,
    state:string,
    price:number,
    id_productor:number,
    url_img:string,
    name:string

}