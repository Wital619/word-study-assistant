import React, { Fragment } from 'react';

import classes from './Modal.css';

const Modal = props => (
  <Fragment>
    {props.show ? (
      <div className={classes.Backdrop} onClick={props.modalClosed} />
    ) : null}
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      {props.children}
    </div>
  </Fragment>
);

export default Modal;
