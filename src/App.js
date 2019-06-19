import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import WordsManager from './containers/WordsManager/WordsManager';
import Auth from './containers/Auth/Auth';
import CardManager from './containers/CardManager/CardManager';
import Logout from './containers/Auth/Logout/Logout';
import AuthContext from './shared/auth-context';

const App = () => {
  const [userData, setUserData] = useState({
    userId: null,
    token: null
  });

  useEffect(() => {
    autoCheckState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (userId, token) => {
    setUserData({ userId, token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    setUserData({ userId: null, token: null });
  };

  const checkTimeout = expirationDate => {
    setTimeout(() => {
      logout();
    }, expirationDate * 1000);
  };

  const autoCheckState = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      logout();
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        const secondsUntilLogout =
          (expirationDate.getTime() - new Date().getTime()) / 1000;

        login(userId, token);
        checkTimeout(secondsUntilLogout);
      } else {
        logout();
      }
    }
  };

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Redirect from="/" to="/auth" />
    </Switch>
  );

  if (userData.userId) {
    routes = (
      <Switch>
        <Route path="/card" component={CardManager} />
        <Route path="/words" component={WordsManager} />
        <Route path="/logout" component={Logout} />
        <Redirect from="/" to="/card" />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          userId: userData.userId,
          token: userData.token,
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
