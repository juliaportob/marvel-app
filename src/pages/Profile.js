import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import validateEmailAndPassword from "../service/Validate";
import { updateUserAPI } from "../service/NativeAPI";
import { updateUser, verifyUser } from "../service/LocalStorage";
import Menu from "../components/Menu";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const setField = (field, value) => {
    if (field === "Name") return setName(value);
    if (field === "Email") return setEmail(value);
    return setPassword(value);
  };

  useEffect(() => {
    const { name, email, password, id, token } = verifyUser(history);
    setName(name);
    setEmail(email);
    setPassword(password);
    setId(id);
    setToken(token);
  }, [history]);

  useEffect(() => {
    if (validateEmailAndPassword(email, password)) {
      setIsDisabled(false);
    }
  }, [email, password]);

  const updateUserOnDB = async () => {
    const requestAPI = await updateUserAPI(name, email, password, id, token);
    console.log(requestAPI, "pagina profile resposta");
    return requestAPI;
  };

  const handleClick = async () => {
    await updateUserOnDB(name, email, password, id, token);
    updateUser(name, email, password);
  };

  return (
    <div className="profile-main-div">
      <header>
        <Menu />
      </header>
      <form className="d-flex flex-column mt-4">
        <div className="register-inputs">
          <Input title="Name" type="text" value={name} onChange={setField} />
          <Input title="Email" type="text" value={email} onChange={setField} />
          <Input
            title="New Password"
            type="password"
            value={password}
            onChange={setField}
          />
        </div>
      </form>
      <section className="register-section-btns">
        <Button title="Save" isDisabled={isDisabled} onClick={handleClick} />
      </section>
    </div>
  );
}
