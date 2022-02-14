import PropTypes from 'prop-types';
import React from 'react';

const Default = ({ children }) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
export default Default;

Default.propTypes = {
  children: PropTypes.node.isRequired,
};
