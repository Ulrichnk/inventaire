import React, { FunctionComponent, useEffect, useState } from "react";
import InventaireService from "./helpers/DbInventaire";
import { Article} from "./helpers/Types";
import { db } from "./helpers/firebase-config";
import { collection} from "firebase/firestore";
type Props = {
  //define your props here
};

const Essai: FunctionComponent<Props> = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const articlesCollectionRef = collection(db, "historiques");
  useEffect(() => {
    InventaireService.getInventaire(0, 1).then((res) => console.log(res));
    // const getArticles = async () => {
    //   try {
    //     const data = await getDocs(articlesCollectionRef);
    //     const fireData: Article[] = data.docs.map((doc) =>
    //      doc.data() as Article
    //     );
    //     console.log(fireData);
    //     setArticles(fireData)
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // InventaireFireService.addHistorique("2023-09-27", "2023-10-28").then((res) => console.log(res));
  }, []);

  return <div>ici on teste les nouvelles options</div>;
};

export default Essai;
