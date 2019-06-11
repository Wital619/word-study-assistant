import React, { Fragment } from 'react';
import Header from '../../components/UI/Header/Header';
import Footer from '../../components/UI/Footer/Footer';

import classes from './Layout.css';

const layout = props => {
  return (
    <Fragment>
      <Header />
      <main className={classes.Content}>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default layout;
