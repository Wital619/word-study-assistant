import React from 'react';

import classes from './Spinner.css';

const Spinner = props => (
  <div className={classes.SpinnerWrapper}>
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
  </div>
);

export default Spinner;
