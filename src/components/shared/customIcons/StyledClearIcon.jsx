import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './icons.module.scss';

const StyledClearIcon = ({ className }) => {
  return <ClearIcon className={`${className} ${classes.clearIcon}`} />;
};

StyledClearIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default StyledClearIcon;
