import PropTypes from 'prop-types';
import React from 'react';

import classes from './container.module.scss';

const ContentSection = (props) => {
  const { children, ...rest } = props;

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <div className={classes.contentSection} {...rest}>
      {children}
    </div>
  );
};

export default ContentSection;

ContentSection.propTypes = {
  children: PropTypes.node.isRequired,
};
