import React, { CSSProperties, FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

type Props = {
  //define your props here
};

const Nav = styled.div`
  & p {
    transition: 0.8s;
  }
  & p:hover {
    color: red;
    margin-left: 5px;
  }
`;

const NavUser: FunctionComponent<Props> = ({}) => {
  const style: CSSProperties = { textDecoration: "none" };

  return (
    <Nav className="z1">
      <div className="lien">
        <NavLink
          to="/mes-informations"
          style={style}
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
        >
          <p>Mes informations &gt;</p>
        </NavLink>
        <NavLink
          to="/mes-produits"
          style={style}
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
        >
          <p>Mes articles &gt;</p>
        </NavLink>
        <NavLink
          to="/mes-posts"
          style={style}
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
        >
          <p>Mes Posts &gt;</p>
        </NavLink>
        <NavLink
          to="/mes-commandes"
          style={style}
          className={(nav) =>
            nav.isActive ? "LinkIsActive" : "LinkIsNotActive"
          }
        >
          <p>Mes commandes &gt;</p>
        </NavLink>
      </div>
    </Nav>
  );
};

export default NavUser;
