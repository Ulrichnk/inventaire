import React, { FunctionComponent, useState } from "react";
import { styled } from "styled-components";
import { Field, Form } from "../helpers/types/Types";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

type Props = {
  //define your props here
};

const LogForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 15px;
  margin: 0 auto;

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
const Log: FunctionComponent<Props> = () => {
  const { user, userIsLogged, loginUser } =
    useLogin();

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
    await loginUser(Form.email.value, Form.password.value).then((res) => {
      if (res) {
         navigate("/");
         window.location.reload();

      }
    });
  };


  return ! userIsLogged ? (
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
        <div>
          <NavLink to="/sign">
            <p> Sign in ?</p>
          </NavLink>
        </div>
      </LogForm>
    </div>
  ) : (

     <>bonjour { user ? user.name : 'utilisateur'}</>
  );
};

export default Log;
