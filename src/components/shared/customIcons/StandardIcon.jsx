import PropTypes from 'prop-types';
import React from 'react';

import classes from './icons.module.scss';

const StandardIcon = ({ alt, src, isAddButton }) => {
  return (
    <img
      alt={alt}
      className={isAddButton ? classes.addIcon : classes.icon}
      src={src}
    />
  );
};

StandardIcon.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  isAddButton: PropTypes.bool.isRequired,
};

export default StandardIcon;
