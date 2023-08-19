import React, { FunctionComponent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useSignin } from "../hooks/useSignin";
import { Field, choix } from "../helpers/types/Types";
type Form = {
  name: Field;
  surname: Field;
  email: Field;
  number: Field;
  password: Field;
  address: Field;
  journalist_state: Field;
  driver_state: Field;
};

const SignForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 15px;
  outline: 1px solid red;
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
const SignContainer = styled.div``;

const Sign: FunctionComponent = () => {
  const navigate=useNavigate();
  const { sign , user} = useSignin();
  const [Form, setForm] = useState<Form>({
    name: { value: "", isValid: true },
    surname: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
    number: { value: "", isValid: true },
    address: { value: "", isValid: true },
    journalist_state: { value: false, isValid: true },
    driver_state: { value: false, isValid: true },
  });
  const Types: choix[] = [
    { name: "journalist", value: "journalist_state" },
    { name: "driver", value: "driver_state" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };
    console.log("vous avez selectionner", fieldName);

    setForm({ ...Form, ...newField });
  };

  const selectType = (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const fieldName: string = e.target.name;
    const checked = e.target.checked;
    if (checked) {
      setForm({ ...Form, ...{ [fieldName]: { value: true } } });
      console.log("vous avez coché", fieldName);
    } else {
      setForm({ ...Form, ...{ [fieldName]: { value: false } } });
      console.log("vous avez décoché", fieldName);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(Form);
    await sign(
      Form.name.value,
      Form.surname.value,
      Form.email.value,
      Form.password.value,
      Form.number.value,
      Form.address.value,
      Form.journalist_state.value,
      Form.driver_state.value
    ).then((res) => {
      if (!res) {
        alert("bravo");
        navigate('/');
      }else{  
        alert("vos errerur "+ res);
      }
    });
  };
  return (
    <SignContainer>
      <SignForm onSubmit={(e) => handleSubmit(e)}>
        <p className="heading">Sign in</p>
        <input
          value={Form.name.value}
          name="name"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="name"
          type="text"
        />
        <input
          value={Form.surname.value}
          name="surname"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="surname"
          type="text"
        />
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
        <input
          value={Form.number.value}
          name="number"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="phone number"
          type="text"
        />
        <input
          value={Form.address.value}
          name="address"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="addresse"
          type="text"
        />
        <div className="type">
          <div>
            {" "}
            Vous voulez être un livreur ou un journalist ? cochez les cases
          </div>
          {Types.map((type) => (
            <div key={type.value}>
              <label htmlFor={type.value}>
                {type.name}
                <input
                  id={type.value}
                  name={type.value}
                  type="checkbox"
                  onChange={(e) => selectType(type.value, e)}
                ></input>
              </label>
            </div>
          ))}
        </div>
        <button className="btn">Submit</button>
        <div>
          <NavLink to="/log">
            <p> log in ?</p>
          </NavLink>
        </div>
      </SignForm>
    </SignContainer>
  );
};

export default Sign;
