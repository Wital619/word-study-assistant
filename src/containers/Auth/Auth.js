import React, { useState, useContext } from 'react';
import axios from '../../shared/axios-words';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';
import AuthContext from '../../shared/auth-context';

import classes from './Auth.css';

const Auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your Email'
      },
      value: '',
      validation: {
        required: {
          ruleValue: true,
          message: 'The Email field could not be empty'
        },
        pattern: {
          ruleValue: /^([a-zA-Z0-9]{3,15})@([\w]{2,7})\.([\w]{2,5})$/,
          message: 'The Email field must be a valid email'
        }
      },
      validationMessage: null,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Your Password'
      },
      value: '',
      validation: {
        required: {
          ruleValue: true,
          message: 'The Password field could not be empty'
        },
        minLength: {
          ruleValue: 6,
          message: 'The Email field must be at least 6 characters'
        }
      },
      validationMessage: null,
      touched: false
    }
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  const inputChangedHandler = (e, controlName) => {
    const control = updateObject(authForm[controlName], {
      value: e.target.value,
      touched: true
    });

    control.validationMessage = checkValidity(
      control.value,
      control.validation
    );

    const updatedControls = updateObject(authForm, {
      [controlName]: control
    });

    let formIsValid = true;

    for (let identifier in updatedControls) {
      formIsValid =
        !updatedControls[identifier].validationMessage &&
        updatedControls[identifier].touched &&
        formIsValid;
    }

    setAuthForm(updatedControls);
    setIsSignUp(formIsValid);
  };

  const submitHandler = e => {
    e.preventDefault();

    const mode = isSignUp ? 'signupNewUser' : 'verifyPassword';
    const authData = {
      email: authForm.email.value,
      password: authForm.password.value,
      returnSecureToken: true
    };

    setLoading(true);

    axios
      .post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${mode}?key=AIzaSyBJvUWvJZ-H3JHZjoNczcnvEsxFFqDJXVI`,
        authData
      )
      .then(res => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );

        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('userId', res.data.localId);
        localStorage.setItem('expirationDate', expirationDate);
        
        setLoading(false);
        auth.login(res.data.localId, res.data.idToken);
        auth.checkTimeout(res.data.expiresIn);
      })
      .catch(err => {
        setError(err.response.data.error);
        setLoading(false);
      });
  };

  const switchAuthModeHandler = (e, isSignUp) => {
    e.preventDefault();
    setIsSignUp(isSignUp);
  };

  const formElementsArray = [];

  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
    });
  }

  let form = formElementsArray.map(formElement => {
    return (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        validationMessage={formElement.config.validationMessage}
        touched={formElement.config.touched}
        shouldValidate={Boolean(formElement.config.validation)}
        changed={e => inputChangedHandler(e, formElement.id)}
      />
    );
  });

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.Auth}>
      {error}
      <div>
        <Button
          btnType="Primary"
          clicked={e => switchAuthModeHandler(e, false)}
          active={!isSignUp}
        >
          SIGN IN
        </Button>
        <Button
          btnType="Primary"
          clicked={e => switchAuthModeHandler(e, true)}
          active={isSignUp}
        >
          SIGN UP
        </Button>
      </div>
      <form>{form}</form>
      <Button btnType="Success" clicked={submitHandler}>
        SUBMIT
      </Button>
    </div>
  );
};

export default Auth;
