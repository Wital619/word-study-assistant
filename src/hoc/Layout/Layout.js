import React, { Fragment, useContext } from 'react';
import Header from '../../components/UI/Header/Header';
import Footer from '../../components/UI/Footer/Footer';
import AuthContext from '../../shared/auth-context';

const Layout = props => {
  const auth = useContext(AuthContext);

  return auth.userId ? (
    <Fragment>
      <Header />
      <main style={{ height: 'calc(100% - 90px)' }}>{props.children}</main>
      <Footer />
    </Fragment>
  ) : (
    <Fragment>
      <main style={{ height: '100%' }}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
