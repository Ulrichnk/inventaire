import React, { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import Sign from "../../pages/Sign";
import Accueil from "../../pages/Accueil";
import Products from "../../pages/Products";
import Blog from "../../pages/Blog";
import Log from "../../pages/Log";
import Account from "../../pages/Account";
import { User } from "../../helpers/types/Types";
type Props = {
  userIsLogged: Boolean;
  user:User |null;
};

const AllPages: FunctionComponent<Props> = ({ userIsLogged,user }) => {
  return userIsLogged ? (
    <>
    <Routes>
      <Route path="/" element={<Accueil/>} />
      <Route path="/produits" element={<Products/>} />
      <Route path="/blog" element={<Blog/>} />
      <Route path="/sign" Component={Sign} />
      <Route path="/account" element={<Account user={user} />} />

    </Routes>
  </>  ) : (
    <>
      <Routes>
        <Route path="/" element={<Accueil/>} />
        <Route path="/produits" element={<Products/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/sign" Component={Sign} />
        <Route path="/log" Component={Log} />
      </Routes>
    </>
  );
};

export default AllPages;
