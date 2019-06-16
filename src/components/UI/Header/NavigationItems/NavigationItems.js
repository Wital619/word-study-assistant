import React, { useContext, Fragment } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import AuthContext from '../../../../shared/auth-context';

import classes from './NavigationItems.css';

const NavigationItems = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className={classes.NavigationItems}>
      {auth.userId ? (
        <Fragment>
          <NavigationItem link="/card">Card</NavigationItem>
          <NavigationItem link="/words">Words</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </Fragment>
      ) : (
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
