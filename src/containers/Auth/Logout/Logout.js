import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../../shared/auth-context';

const Logout = () => {
  const auth = useContext(AuthContext);

  auth.logout();

  return <Redirect to="/" />;
};

export default Logout;
