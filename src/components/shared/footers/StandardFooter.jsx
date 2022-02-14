import PropTypes from 'prop-types';
import React from 'react';

import classes from './footer.module.scss';

const StandardFooter = ({ children }) => {
  return <div className={classes.footerContainer}>{children}</div>;
};

StandardFooter.propTypes = {
  children: PropTypes.node,
};

StandardFooter.defaultProps = {
  children: undefined,
};

export default StandardFooter;
