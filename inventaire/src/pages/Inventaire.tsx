import React, { FunctionComponent, useState } from "react";
import { styled } from "styled-components";
import {  User } from "../helpers/types/Types";
import { Dispatch, SetStateAction } from 'react';

type Props = {
  //define your props here
  user:User|null,
  setUser: Dispatch<SetStateAction<User>>;
  setUserIslogged: Dispatch<SetStateAction<boolean>>;

};

const Inventaire: FunctionComponent<Props> = ({user, setUser, setUserIslogged}) => {
  return <div>fairre l'inventaire</div>;
};

export default Inventaire;
