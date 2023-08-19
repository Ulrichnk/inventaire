import React, { useState }  from 'react';
import { Product } from '../helpers/types/Types';
import axios from 'axios';



export function useProduct(){
    const[products,setProducts]=useState<Product>();
    const[myProducts,setMyProducts]=useState<Product>();
    const [productsIsLoading, setProductsIsLoading] = useState(true);
    
    const productsRender = async () => {
        try {
          await axios
            .get(`${process.env.REACT_APP_BACKEND_URL}products`)
            .then((res) => {
              console.log("chargement des products pour la session");
              setProducts(res.data.products);
              setProductsIsLoading(false);
              console.log(res.data.products);
              return res.data.product;
            });
        } catch (error) {
          console.error(error);
        }
      };

  const myProductsRender = async (id:number) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}users/products`, { id })
        .then((res) => {
          setMyProducts(res.data.products);
          console.log("chargement des products de l'utilisateur products");
          console.log(res.data.products);
          return res.data.products;
        });
    } catch (error) {
      console.error(error);
    }
  };
   return{products, myProducts, myProductsRender, productsRender, productsIsLoading};
};

