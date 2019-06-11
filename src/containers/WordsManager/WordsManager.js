import React, { useContext } from 'react';
import AuthContext from '../../shared/auth-context';

const WordsManager = props => {
  const auth = useContext(AuthContext);

  return (
    <div>
      <div>UserId: {auth.userId}</div>
      <div>Token: {auth.token}</div>
    </div>
  );
};

export default WordsManager;
