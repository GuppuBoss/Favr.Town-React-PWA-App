import PropTypes from 'prop-types';
import React from 'react';

import classes from './container.module.scss';

const MainContainer = (props) => {
  const { children } = props;

  return <div className={classes.mainWrapper}>{children}</div>;
};

export default MainContainer;

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
