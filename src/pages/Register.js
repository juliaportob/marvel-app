import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { registerUser } from "../service/NativeAPI";
import validateEmailAndPassword from "../service/Validate";
import "../styles/Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (validateEmailAndPassword(email, password)) {
      setIsDisabled(false);
    }
  }, [email, password]);

  const setUserOnAPI = async () => {
    const requestAPI = await registerUser(name, email, password);
    return requestAPI;
  };

  const handleClick = async () => {
    await setUserOnAPI();
    history.push("/");
  };

  const setField = (field, value) => {
    if (field === "Name") return setName(value);
    if (field === "Email") return setEmail(value);
    return setPassword(value);
  };

  return (
    <div className="register-container">
      <form className="register-form">
        <div className="register-inputs">
          <Input
            title="Name"
            type="text"
            value={name}
            onChange={setField}
            placeholder="Name"
          />
          <Input
            title="Email"
            type="text"
            value={email}
            onChange={setField}
            placeholder="Email"
          />
          <Input
            title="Password"
            type="password"
            value={password}
            onChange={setField}
            placeholder="Password"
          />
        </div>
      </form>
      <section className="register-section-btns">
        <Button
          title="Register"
          isDisabled={isDisabled}
          onClick={() => handleClick()}
        />
      </section>
    </div>
  );
}
