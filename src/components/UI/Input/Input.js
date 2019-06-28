import React from 'react';

import classes from './Input.css';

const input = props => {
  const inputClasses = [classes.InputElement];

  if (props.validationMessage && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      <input
        onChange={props.changed}
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
      />
      <div className={classes.ValidationMessage}>{props.validationMessage}</div>
    </div>
  );
};

export default input;
