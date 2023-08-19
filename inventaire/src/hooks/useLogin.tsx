import { useState } from "react";
import axios from "axios";
import { User } from "../helpers/types/Types";



export function useLogin(url: string = "user/login", email:string="", password:string="") {
  const [userIsLogged, setUserIsLogged] = useState<boolean>(false);
  const [userIsDeleted, setUserIsDeleted] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [msg, setMsg] = useState<string>();
  const [status, setStatus] = useState<number>();

  const loginUser = async (email: string="", password: string="") => {
    let bool=false;
    if (localStorage.getItem("user_token") && email === "" && password === "") {
      try {
        await axios
          .get(`${process.env.REACT_APP_BACKEND_URL}user`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user_token")}`,
            },
          })
          .then((res) => {
            if (res.data.user.state === false) {
              setMsg("votre compte a été suspendu.");
              setUserIsDeleted(true);
              setStatus(200);
              bool=false;
            } else{
              setUser(res.data.user);
              setMsg("Utilisateur connecté.");
              console.log('votre token');
              
              setUserIsLogged(true);
              setStatus(200);
              bool=true;

            }
          });
      } catch (error) {
        console.error(error);
        setUser(null);
        setStatus(400);
      }
    } else if (email !== null && password !== null) {
      if (email !== "" && password !== "") {
        try {
          await axios
            .post(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
              email,
              password,
            })
            .then((res) => {
              if (res.data.status === 200) {
                localStorage.setItem("user_token", res.data.token);
                setUserIsLogged(true);
                setUser(res.data.user);
                setMsg("Utilisateur connecté.");
                setStatus(200);
              bool=true;

              } else {
                console.log("Utilisateur inconnu");
                setMsg("Utilisateur inconnu.");
                setStatus(400);
              } 
            });
        } catch (error) {
          setUser(null);
          setMsg("Erreur serveur"+error);
          setStatus(400);
          console.error(error);
        }
      } else {
        alert("veuillez remplir tous les champs");
        setUser(null);
        setMsg("Erreur serveur, veuillez remplir tous les champs");
        setStatus(400);

      }
    }
    return bool;
  };

 

  return {user, msg, status, userIsLogged, userIsDeleted,loginUser};
}
