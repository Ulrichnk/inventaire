import React, { FunctionComponent, useState } from "react";
import { styled } from "styled-components";
import { Field, Form, Junior, Roger, User } from "../helpers/Types";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

type Props = {
  //define your props here
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
  setUserIslogged: Dispatch<SetStateAction<boolean>>;
};

const LogForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 15px;
  margin: 0 auto;
  min-height: 100vh;

  & input[type="checkbox"] {
    margin-top: 15px;
  }
  & input[type="text"],
  input[type="password"] {
    border-radius: 5px;
    height: 50px;
    width: 250px;
  }
  & button {
  }
`;
const Log: FunctionComponent<Props> = ({ user, setUser, setUserIslogged }) => {
  const [Form, setForm] = useState<Form>({
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };
    console.log("vous avez selectionner", fieldName);

    setForm({ ...Form, ...newField });
  };
  const HandleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(Form);
    if (
      Form.email.value === Roger.email &&
      Form.password.value === Roger.password
    ) {
      setUserIslogged(true);
      setUser(Roger);
      localStorage.setItem("user_token", "roger");
      navigate("/");
    } else if (
      Form.email.value === Junior.email &&
      Form.password.value === Junior.password
    ) {
      setUserIslogged(true);
      setUser(Junior);
      navigate("/");
    } else {
      alert("information de connexion incorrecte");
    }
  };

  return (
    <div>
      page de connexion
      <LogForm onSubmit={(e) => HandleSubmit(e)}>
        <p className="heading">log in</p>

        <input
          value={Form.email.value}
          name="email"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="email"
          type="text"
        />
        <input
          value={Form.password.value}
          name="password"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="Password"
          type="password"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </LogForm>
    </div>
  );
};

export default Log;
