import React, { FunctionComponent } from "react";
import { Dispatch, SetStateAction } from 'react';
import {  User } from "../helpers/types/Types";



type Props = {
  //define your props here
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
  setUserIslogged: Dispatch<SetStateAction<boolean>>;
};

const Gestion: FunctionComponent<Props> = ({user, setUser, setUserIslogged}) => {
  return <div> vous etes sur la page des gestions</div>;
};

export default Gestion;
