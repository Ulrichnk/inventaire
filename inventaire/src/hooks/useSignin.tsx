import axios from "axios";
import {useState } from "react";
import { User } from "../helpers/types/Types";

export function useSignin(
  url: string = "user/signin",
  name: string = "",
  surname: string = "",
  email: string = "",
  password: string = "",
  number: string = "",
  address: string = "",
  state: boolean = true,
  journalist_state: boolean = false,
  driver_state: boolean = false
) {
  const [userIsLogged, setUserIsLogged] = useState<Boolean>(false);
  const [user, setUser] = useState<User>();

  const sign = async (
    name: string = "",
    surname: string = "",
    email: string = "",
    password: string = "",
    number: string = "",
    address: string = "",
    state: boolean = true,
    journalist_state: boolean = false,
    driver_state: boolean = false
  ) => {
    let bool=false;
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      number !== "" &&
      surname !== ""
    ) {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
          name,
          surname,
          email,
          password,
          state,
          number,
          address,
          journalist_state,
          driver_state,
        })
        .then((res) => {
          console.log("Réponse de la requête POST:", res.data);
          if (res.data.status === 200) {
            localStorage.setItem("user_token", res.data.token);
            setUserIsLogged(true);
            setUser(res.data.user);
            bool=true;
          }else{
          }

          // Faites quelque chose avec la réponse...
        })
        .catch((error) => {
          console.error("Erreur lors de la requête POST:", error);
          // Gérez l'            error=res.data.error;
        });
    } else {
      alert("Veuillez remplir tous les champs");
      console.log("Veuillez remplir tous les champs");

    }
    return bool;
  };

  return { userIsLogged, user, sign};
}
