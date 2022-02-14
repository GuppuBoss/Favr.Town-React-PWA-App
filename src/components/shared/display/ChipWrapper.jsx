import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './chipWrapper.module.scss';

const ChipWrapper = ({ label, className }) => {
  return (
    <Chip
      className={`${classes.chip} ${className}`}
      label={label}
      variant="outlined"
    />
  );
};

ChipWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default ChipWrapper;
