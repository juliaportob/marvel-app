import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import validateEmailAndPassword from '../service/Validate';

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
    <div>
      <section className="defaultPage">
        <form className="loginForm">
          <section className="loginInputs">
            <Input
              title="Email"
              type="text"
              value={ email }
              onChange={ setField }
              placeholder="User email"
            />
            <Input
              title="Password"
              type="password"
              value={ password }
              onChange={ setField }
              placeholder="User password"
            />
          </section>
          <section className="loginButtons">
            <Button
              title="Log in"
              testId="signin-btn"
              isDisabled={ isDisabled }
              onClick={ () => history.push('/main') }
            />
            <Button
              title="Sign up"
              onClick={ () => history.push('/register') }
            />
          </section>
        </form>
      </section>
    </div>
  );
}
