import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/card">Card</NavigationItem>
    <NavigationItem link="/uploader">Uploader</NavigationItem>
    <NavigationItem link="/logout">Logout</NavigationItem>
  </ul>
);

export default NavigationItems;
