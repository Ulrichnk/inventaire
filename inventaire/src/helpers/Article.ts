export default class Article{

    id: number;
    nom: string;
    prix_achat: string;
    prix_vente: string;
    created: Date;
    constructor(
         id: number,
         nom: string="",
         prix_achat: string="",
         prix_vente: string="",
         created: Date=new Date(),
    ){
        this.id = id;
        this.nom = nom;
        this.prix_achat = prix_achat;
        this.prix_vente = prix_vente;
        this.created = created;

    }
}