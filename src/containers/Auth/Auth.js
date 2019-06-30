import React, { useState, useContext } from 'react';
import axios from 'axios';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Tabs from '../../components/UI/Tabs/Tabs';
import AuthContext from '../../shared/auth-context';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {
  updateObject,
  checkValidity,
  getDateByAmountOfTime
} from '../../shared/utility';

import classes from './Auth.css';

const AUTH_TABS = ['sign In', 'sign up'];

// TODO:
// 1) refreshToken function;
// 2) notifications (in auth, and when fetch words);
// 3) fix reload bug;
// 4) redirect after uploading;
// 5) maybe add validation on uploaded file content
// 5) add system of points
// 6) add padding to word area, and to choices words too
// 7) add autofocus if word wasn't guessed

const Auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
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
  const [authTab, setAuthTab] = useState('sign In');
  const [formIsValid, setFormIsValid] = useState(false);
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
    setFormIsValid(formIsValid);
  };

  const submitHandler = e => {
    e.preventDefault();

    const mode = authTab === 'sign up' ? 'signupNewUser' : 'verifyPassword';
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
        const expirationTime = parseInt(res.data.expiresIn, 10);
        const expirationDate = getDateByAmountOfTime(expirationTime);

        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('userId', res.data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        setLoading(false);

        auth.login(res.data.localId);
        auth.checkTimeout(expirationTime);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const formElementsArray = [];

  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
    });
  }

  let form = (
    <div className={classes.SpinnerWithMargin}>
      <Spinner />
    </div>
  );

  if (!loading) {
    form = (
      <form className={classes.AuthForm}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            validationMessage={formElement.config.validationMessage}
            touched={formElement.config.touched}
            shouldValidate={Boolean(formElement.config.validation)}
            changed={e => inputChangedHandler(e, formElement.id)}
          />
        ))}
      </form>
    );
  }

  return (
    <div className={classes.Auth}>
      <Tabs tabs={AUTH_TABS} onChangeTab={setAuthTab} activeTab={authTab} />
      {form}
      <Button btnType="Success" clicked={submitHandler} disabled={!formIsValid}>
        SUBMIT
      </Button>
    </div>
  );
};

export default withErrorHandler(Auth, axios);
