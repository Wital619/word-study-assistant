import React from 'react';

import classes from './WordItem.css';

const WordItem = props => (
  <li className={classes.WordItem}>{props.children}</li>
);

export default WordItem;
