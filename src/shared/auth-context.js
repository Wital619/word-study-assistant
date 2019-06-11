import React from 'react';

const authContext = React.createContext({
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  checkTimeout: () => {}
});

export default authContext;
