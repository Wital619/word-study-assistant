import React from 'react';
import NavigationItems from './NavigationItems/NavigationItems';

import classes from './Header.css';

const header = () => (
  <header className={classes.Header}>
    <NavigationItems />
  </header>
);

export default header;
