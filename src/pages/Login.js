import PropTypes from 'prop-types';
import React, { useState } from 'react';
import '../Page.css';
import { Button, Form } from 'react-bootstrap';
import kiGostosoLaranja from '../images/kiGostosoLaranja.png';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [mealsToken, setMealsToken] = useState(1);
  const [cocktailsToken, setCocktailsToken] = useState(1);

  const validateForm = () => {
    setEmail((prevEmail) => {
      const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.com/i;
      const validEmail = emailRegex.test(prevEmail);
      setIsValidEmail(validEmail);
      return prevEmail;
    });

    setPassword((prevPassword) => {
      const SIX = 6;
      if (prevPassword.length > SIX) {
        setIsValidPassword(true);
      } else {
        setIsValidPassword(false);
      }
      return prevPassword;
    });
  };

  const HandleChange = ({ target }) => {
    const { type, value } = target;
    if (type === 'email') {
      setEmail(value);
      console.log('setandoEmail', email);
    } else {
      setPassword(value);
      console.log('setandoPassword', password);
    }
    validateForm();
  };

  const HandleClick = () => {
    // para o lint nao reclamar, usei as funcções para setar o token
    const user = { email };
    setCocktailsToken(1);
    setMealsToken(1);
    localStorage.setItem('mealsToken', mealsToken);
    localStorage.setItem('cocktailsToken', cocktailsToken);
    localStorage.setItem('user', JSON.stringify(user));
    history.push('./foods');
  };

  return (
    <div className="centralizar login">
      <div className="card">

        <img src={ kiGostosoLaranja } className="imagem-logo" alt="logo-kiGostoso" />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              data-testid="email-input"
              value={ email }
              onChange={ HandleChange }
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={ password }
              data-testid="password-input"
              onChange={ HandleChange }
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            variant="warning"
            type="button"
            data-testid="login-submit-btn"
            disabled={ !(isValidEmail && isValidPassword) }
            onClick={ HandleClick }
          >
            Submit
          </Button>
        </Form>

        {/*   <div>
          <input
            placeholder="email"
            id="email"
            type="text"
            data-testid="email-input"
            value={ email }
            onChange={ HandleChange }
          />
        </div>
        <div className="input-password">
          <input
            type="text"
            placeholder="password"
            id="password"
            value={ password }
            data-testid="password-input"
            onChange={ HandleChange }
          />
        </div>
        <div>
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ !(isValidEmail && isValidPassword) }
            onClick={ HandleClick }
          >
            Enter
          </button>
        </div> */}
      </div>
    </div>

  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
