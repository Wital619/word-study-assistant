import React from 'react';

import classes from './Spinner.css';

const spinner = props => (
  <div
    className={classes.Spinner}
    style={
      props.marginTop
        ? { marginTop: props.marginTop, width: '5em', height: '5em' }
        : {}
    }
  >
    Loading...
  </div>
);

export default spinner;
