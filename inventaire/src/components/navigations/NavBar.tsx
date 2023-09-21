import React, { CSSProperties, FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import "./nav.scss";
import { HiOutlineViewGrid } from "react-icons/hi";

const NavHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  padding: 0 auto;
`;

const NavBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & p {
    font-size: 1.1rem;
    transition: 0.8s;
  }
  & div {
    display: flex;
    flex-direction: row;
    gap: 15px;
    margin-bottom: 40px;
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
  state?: boolean;
};

const NavBar: FunctionComponent<Props> = ({ userIsLogged, state = false }) => {
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
        <div>
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
        </div>
      </NavBody>
    </div>
  ) : (
    <div className="nav" style={state ? styl : styl1}>
      <div className="">
        <HiOutlineViewGrid className="icon"/>
        <h2>Inventaire</h2>
      </div>
      <ul className="ul">
        {/* <li>
          <h2>Inventaire</h2>
        </li> */}
        <li>
          <NavLink
            to="/"
            className={(nav) =>
              nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
            }
            style={style}
          >
            Accueil
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            to="/inventaire"
            className={(nav) =>
              nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
            }
            style={style}
          >
            Inventaire
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            to="/gestion-articles"
            className={(nav) =>
              nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
            }
            style={style}
          >
            <>Gestion des articles</>
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            to="/historiques"
            className={(nav) =>
              nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
            }
            style={style}
          >
            <>Historiques</>
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            to="/essai"
            className={(nav) =>
              nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
            }
            style={style}
          >
            <>Essai</>
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            to="/enregistrement-achats"
            className={(nav) =>
              nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
            }
            style={style}
          >
            <>Enregistrement des achats</>
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            to="/enregistrement-ventes"
            className={(nav) =>
              nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
            }
            style={style}
          >
            <>Enregistrement des ventes</>
          </NavLink>
        </li>
        <li>
          {" "}
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
            <>Déconnexion</>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
