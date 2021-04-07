import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import validateEmailAndPassword from '../service/Validate';
import SpiderMan from '../images/spider-man.png';
import Logo from '../images/logo.png';
import '../styles/Login.css';

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (validateEmailAndPassword(email, password)) {
      setIsDisabled(false);
    }
  }, [email, password]);

  const setField = (field, value) => {
    if (field === 'Email') return setEmail(value);
    return setPassword(value);
  };

  return (
    <div className="main-div-login">
      <a href="https://fontmeme.com/3d-fonts/">
        <img
          className="login-title"
          src="https://fontmeme.com/permalink/210407/b230fb5c229aaae01a07a6588e401572.png"
          alt="3d-fonts" border="0" />
      </a>
      {/* <h1 className="login-title">Marvel's Fav</h1> */}
      <div className="div-spider">
        <img className="spider-man" src={ SpiderMan } alt="Spider Man" /> 
      </div>
      <section className="defaultPage">
        <form className="loginForm">
          <section className="loginInputs">
            <div className="individual-inputs">
              <Input
                className="individual-inputs"
                title="Email"
                type="text"
                value={ email }
                onChange={ setField }
                placeholder="User email"
              />
            </div>
            <div className="individual-inputs">
              <Input
                title="Password"
                type="password"
                value={ password }
                onChange={ setField }
                placeholder="User password"
              />
            </div>
          </section>
          <section className="loginButtons">
            <Button
              title="Log in"
              className="indiv-btn"
              isDisabled={ isDisabled }
              onClick={ () => history.push('/main') }
            />
            <h3 className="create-account">Don't have an account?</h3>
            <Button
              title="Sign up"
              className="indiv-btn"
              onClick={ () => history.push('/register') }
            />
          </section>
        </form>
      </section>
      {/* <div className="div-img-login">
        <img className="img-iron" src={ IronMan } alt="Iron man" /> 
      </div> */}
    </div>
  );
}
