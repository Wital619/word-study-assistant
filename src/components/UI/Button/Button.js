import React from 'react';

import classes from './Button.css';

const button = props => (
  <button
    disabled={props.disabled}
    className={[
      classes.Button,
      classes[props.btnType],
      props.active ? classes.Active : null
    ].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
