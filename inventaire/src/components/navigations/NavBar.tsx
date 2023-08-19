import React, { CSSProperties, FunctionComponent, useState } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const Nav = styled.div`
  display: flex;
  flex-direction: column;
`;
const NavHead = styled.div`
  display: flex;
`;

const NavBody = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  gap: 25px;
  padding: 20px;
  margin: 0 auto;
  & p {
    transition: 0.8s;
  }
  & p:hover {
    color: red;
  }
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin: auto;
`;
const Icon = styled.div`
  display: flex;
  gap: 10px;
  margin: auto;
  cursor: pointer;
`;

const Search = styled.form`
  margin: 10px auto;
  border-radius: 12px;
  display: flex;
  /*outline: 1px solid rgb(132, 227, 132) ;*/

  & input {
    height: 40px;
    border-radius: 15px 15px 15px 15px;
    box-shadow: 0 0 0 5px rgb(132, 227, 132) inset;
  }
  & button {
    border: none;
    background-color: white;
    text-align: center;
    width: 60px;
    box-shadow: 0 0 0 5px rgb(132, 227, 132) inset;
    border-radius: 15px 15px 15px 15px;
    transition: 0.8s;
  }
  & button:hover {
    background-color: rgb(132, 227, 132);
    color: white;
    font-weight: bold;
  }
`;

type Props = {
  userIsLogged: Boolean;
  menu: JSX.Element;
};

const NavBar: FunctionComponent<Props> = ({ userIsLogged, menu }) => {
  const [state, setState] = useState<boolean>(false);
  // const click = (e: Event) => {
  //   const target = e.target as HTMLElement;

  //   if (state) {
  //     if (target.classList.contains("profil")) {
  //       setState(false);
  //     } else {
  //       setState(!state);
  //     }
  //   } else {
  //   }
  //   console.log("votre state", state);
  // };

  // useEffect(() => {
  //   document.documentElement.addEventListener("click", (e) => {
  //     click(e);
  //   });
  //   // Retirer l'écouteur d'événement lorsque le composant est démonté
  //   return () => {
  //     document.documentElement.removeEventListener("click", (e) => {
  //       click(e);
  //     });
  //   };
  // }, []);

  const style: CSSProperties = { textDecoration: "none" };

  return userIsLogged ? (
    <div className="nav-bar">salut</div>
  ) : (
    <Nav>
      <NavHead>
        <Title>TogoAgri</Title>
        <Search>
          <button type="submit" onClick={(e) => e.preventDefault()}>
            search
          </button>
          <input
            placeholder="veuillez entrer un mot à chercher"
            name="search"
          ></input>
        </Search>
        <Icon className="nav-icon">
          <div className="img profil">
            {" "}
            <img
              alt="profil-icon"
              src="profil.png"
              width={"40px"}
              onClick={(e) => {
                setState(!state);
              }}
            />
            {state && menu}
          </div>
          <div className="img">
            {" "}
            <img alt="basket-icon" src="profil.png" width={"40px"} />
          </div>
          <div className="img">
            {" "}
            <img alt="help-icon" src="help.png" width={"40px"} />
          </div>
        </Icon>
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
          to="/produits"
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
          style={style}
        >
          <p>Produits</p>
        </NavLink>
        <NavLink
          to="/blog"
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive "
          }
          style={style}
        >
          <p>Blog</p>
        </NavLink>
      </NavBody>
    </Nav>
  );
};
export default NavBar;
