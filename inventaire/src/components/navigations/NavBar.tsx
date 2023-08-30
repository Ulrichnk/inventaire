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
  margin: 40px auto;
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
  margin: 80px auto;
`;

type Props = {
  userIsLogged: Boolean;
  state: boolean;
};

const NavBar: FunctionComponent<Props> = ({ userIsLogged, state }) => {
  let navigate = useNavigate();
  const styl: CSSProperties = { display: "none" };
  const styl1: CSSProperties = { display: "block" };

  const style: CSSProperties = { textDecoration: "none" };

  return !userIsLogged ? (
    <div className="nav" style={state ? styl : styl1}>
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
    <div className="nav" style={state ? styl : styl1}>
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
          to="/historiques"
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
          style={style}
        >
          <p>Historiques</p>
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
