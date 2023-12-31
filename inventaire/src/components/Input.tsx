import React, { FunctionComponent } from "react";
import { Dispatch, SetStateAction } from "react";


type Field<T> = {
  value?: T;
  isValid?: boolean;
};
type Form = {
  nom: Field<string>;
  prix_achat: Field<number>;
  prix_vente: Field<number>;
  id: Field<number>;
};

type Props = {
  //define your props here
  Form:Form,
  setForm:Dispatch<SetStateAction<Form>>
  
};
const Input: FunctionComponent<Props> = ({Form,setForm}) => {
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    if (e.target.name === "nom") {
      const newField: Field<string> = {
        [fieldName]: { value: fieldValue, isValid: true },
      };
      console.log("vous avez selectionner", fieldName);

      setForm({ ...Form, ...newField });
    } else {
      const newField: Field<number> = {
        [fieldName]: { value: fieldValue, isvalid: true },
      };
      console.log("vous avez selectionner", fieldName);

      setForm({ ...Form, ...newField });
    }
  };
  return (
    <tr>
      <td>
        <input
          value={Form.nom.value}
          name="nom"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="nom article"
          type="text"
        />
      </td>
      <td>
        <input
          value={Form.prix_achat.value !== 0 ? Form.prix_achat.value : ""}
          name="prix_achat"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="prix d'achat"
          type="text"
        />
      </td>
      <td>
        <input
          value={Form.prix_vente.value !== 0 ? Form.prix_vente.value : ""}
          name="prix_vente"
          onChange={(e) => handleInputChange(e)}
          className="input"
          placeholder="prix de vente"
          type="text"
        />
      </td>
    </tr>
  );
};

export default Input;
