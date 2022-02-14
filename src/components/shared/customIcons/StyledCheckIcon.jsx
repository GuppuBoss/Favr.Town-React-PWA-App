import CheckIcon from '@mui/icons-material/Check';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './icons.module.scss';

const StyledCheckIcon = ({ className }) => {
  return <CheckIcon className={`${className} ${classes.checkIcon}`} />;
};

StyledCheckIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default StyledCheckIcon;
