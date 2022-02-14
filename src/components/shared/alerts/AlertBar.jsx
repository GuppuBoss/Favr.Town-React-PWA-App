import PropTypes from 'prop-types';
import React from 'react';

import Alert from './Alert';

const AlertBar = (props) => {
  return (
    <Alert
      severity={props.severity}
      style={{
        position: 'fixed',
        zIndex: 50,
        width: '-webkit-fill-available',
      }}
    >
      {props.message}
    </Alert>
  );
};
AlertBar.propTypes = {
  severity: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
export default AlertBar;
