import React, { Fragment } from 'react';
import useHttpErrorHandler from '../../hooks/http-error-handler';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Fragment>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} isError={Boolean(error)} />
      </Fragment>
    );
  };
};

export default withErrorHandler;
