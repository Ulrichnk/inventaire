import React, { CSSProperties, FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const NavHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
  display: flex;
`;

const NavBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  margin: 0 auto;
  & p {
    transition: 0.8s;
  }
  & p:hover {
    color: red;
  }
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: auto;
`;

// const Search = styled.form`
//   margin: 10px auto;
//   border-radius: 12px;
//   display: flex;
//   /*outline: 1px solid rgb(132, 227, 132) ;*/

//   & input {
//     height: 40px;
//     border-radius: 15px 15px 15px 15px;
//     box-shadow: 0 0 0 5px rgb(132, 227, 132) inset;
//   }
//   & button {
//     border: none;
//     background-color: white;
//     text-align: center;
//     width: 60px;
//     box-shadow: 0 0 0 5px rgb(132, 227, 132) inset;
//     border-radius: 15px 15px 15px 15px;
//     transition: 0.8s;
//   }
//   & button:hover {
//     background-color: rgb(132, 227, 132);
//     color: white;
//     font-weight: bold;
//   }
// `;

type Props = {
  userIsLogged: Boolean;
};

const NavBar: FunctionComponent<Props> = ({ userIsLogged }) => {
  let navigate = useNavigate();

  const style: CSSProperties = { textDecoration: "none" };

  return !userIsLogged ? (
    <div className="nav">
      <NavHead>
        <Title>Inventaire</Title>
      </NavHead>
      <NavBody>
        <NavLink
          to="/"
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
          style={style}
        >
          <p>Accueil</p>
        </NavLink>
        <NavLink
          to="/log"
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
          style={style}
        >
          <p>Inventaire</p>
        </NavLink>
        <NavLink
          to="/log"
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
          style={style}
        >
          <p>Gestion des articles</p>
        </NavLink>
        <NavLink
          to="/log"
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
          style={style}
        >
          <p>Connexion</p>
        </NavLink>
      </NavBody>
    </div>
  ) : (
    <div className="nav">
      <NavHead>
        <Title>Inventaire</Title>
      </NavHead>
      <NavBody>
        <NavLink
          to="/"
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
          style={style}
        >
          <p>Accueil</p>
        </NavLink>
        <NavLink
          to="/inventaire"
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
          style={style}
        >
          <p>Inventaire</p>
        </NavLink>
        <NavLink
          to="/gestion-articles"
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
          style={style}
        >
          <p>Gestion des articles</p>
        </NavLink>
        <NavLink
          to="/essai"
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
          style={style}
        >
          <p>Essai</p>
        </NavLink>
        <NavLink
          to="/enregistrement-vente"
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
          style={style}
        >
          <p>Enregistrement des achats</p>
        </NavLink>
   
        <NavLink
          to="inconnu"
          onClick={() => {
            localStorage.removeItem("user_token");
            navigate("/");
            window.location.reload();
          }}
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
          style={style}
        >
          <p>Déconnexion</p>
        </NavLink>
      </NavBody>
    </div>
  );
};
export default NavBar;
