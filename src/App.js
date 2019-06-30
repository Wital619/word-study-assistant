import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import CardManager from './containers/CardManager/CardManager';
import WordsManager from './containers/WordsManager/WordsManager';
import Logout from './containers/Auth/Logout/Logout';
import AuthContext from './shared/auth-context';
import { getDateByAmountOfTime } from './shared/utility';
import axios from 'axios';

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    autoCheckState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = userId => {
    setUserId(userId);
  };

  const logout = () => {
    localStorage.clear();
    setUserId(null);
  };

  const checkTimeout = secondsUntilLogout => {
    setTimeout(() => {
      getNewToken();
    }, secondsUntilLogout * 1000);
  };

  const autoCheckState = () => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      login(userId);

      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const secondsUntilLogout =
        (expirationDate.getTime() - new Date().getTime()) / 1000;

      if (secondsUntilLogout > 600) {
        checkTimeout(secondsUntilLogout);
      } else {
        getNewToken();
      }
    }
  };

  const getNewToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');

    const url = `https://securetoken.googleapis.com/v1/token?key=AIzaSyBJvUWvJZ-H3JHZjoNczcnvEsxFFqDJXVI`;
    const body = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    };

    axios
      .post(url, body)
      .then(res => {
        const newToken = res.data.id_token;
        const expirationTime = parseInt(res.data.expires_in, 10);
        const newExpirationDate = getDateByAmountOfTime(expirationTime);

        localStorage.setItem('token', newToken);
        localStorage.setItem('expirationDate', newExpirationDate);

        checkTimeout(expirationTime);
      })
      .catch(() => {
        console.log('Error Occured. Logout...');
        logout();
      });
  };

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Redirect from="/" to="/auth" />
    </Switch>
  );

  if (userId) {
    routes = (
      <Switch>
        <Route path="/card" component={CardManager} />
        <Route path="/uploader" component={WordsManager} />
        <Route path="/logout" component={Logout} />
        <Redirect from="/" to="/card" />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          userId,
          login,
          logout,
          checkTimeout
        }}
      >
        <Layout>{routes}</Layout>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
