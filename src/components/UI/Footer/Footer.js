import React from 'react';

import classes from './Footer.css';

const footer = () => (
  <footer className={classes.Footer}>
    Vitaliy Pogoretskyy &copy; {new Date().getFullYear()}
  </footer>
);

export default footer;
