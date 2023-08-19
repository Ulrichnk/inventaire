import React, { FunctionComponent } from "react";
import { User } from "../helpers/types/Types";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import NavUser from "../components/navigations/NavUser";

type Props = {
  //define your props here
  user: User | null;
};

const ContCard = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 300px 1fr 1fr;
  grid-template-areas:
  "z1 z2 z3"
  "z1 z4 z5"
  ;
  & .z1{
    grid-area:z1;
  }


  /* box-shadow: 1px solid border;
  outline: 5px solid red;*/
  padding: 150px;
  gap: 90px;
  text-align: center;
  & button {
    background-color: rgb(213, 105, 150);
    width: 25%;
    height: 50px;
    transition: 0.8s;
    border-radius: 15px;
    margin-bottom: 2px;
  }
  & button:hover {
    background-color: rgb(231, 124, 168);
    color: #fff;
    cursor:pointer;

  }
  & div {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    background-color: rgb(231, 228, 228);
    border-radius:15px;

  }
  & .title{
    color:red;
  }
`;
const Card = styled.div`
  /*outline: 5px solid red;*/
`;

const Account: FunctionComponent<Props> = ({ user }) => {
  console.log(user?.driver_state);

  const navigate = useNavigate();
  return user !== null ? (
    <div>
      <ContCard>
        <NavUser />
        <Card>
          <p className="title">— MES COMMANDES —</p>
          <p>0 commande(s) en cours de traitement</p>
          <p>2 commande(s) terminée(s)</p>
          <p>
            Vous pouvez suivre les étapes de votre commande en cours et
            retrouver l'historique de vos commandes passées.
          </p>
          <button onClick={() => navigate("/mes-commandes")}>
            Voir le détail
          </button>
        </Card>
        <Card>
          <p className="title">— MES INFORMATIONS —</p>
          <p>
            Monsieur/Madame {user.name} {user.surname}
          </p>
          <div>
            <>{user.email}</>
            <br />
            <>{user.address}</>
            <br />
            <>{user.number}</>
            <br />
            <>{user.state}</>
          </div>
          <p>
            Vous avez déménagé, changé d'email, de mot de passe... Ici, vous
            pouvez modifier et compléter vos coordonnées.
          </p>
          <button onClick={() => navigate("/mes-informations")}>
            Voir/Modifier
          </button>
        </Card>
        <Card>
          <p className="title">— MES Produits —</p>
          <p>Total produit0s postées: {}</p>
          <p>Total produits vendues: {}</p>
          <p className="descr">
            Vous pouvez suivre l'avancement de vos ventes et retrouver
            l'historique de vos ventes passées.
          </p>
          <button
            className="button_box"
            onClick={() => navigate("/mes-produits")}
          >
            Voir le détail
          </button>
        </Card>
        <Card>
          <p className="title">— MES POST —</p>
          <p>Nombre total de post valider :{} </p>
          <p>Nombre total de post en attente :{}</p>
          <p >
            Vous pouvez rédiger des post et suivre l'état de vos post si ilks
            ont été validé bla lbal balbalblablab.
          </p>
          <button onClick={() => navigate("/mes-posts")}>
            Voir le détail
          </button>
        </Card>
      </ContCard>
    </div>
  ) : (
    <>RAS</>
  );
};

export default Account;
