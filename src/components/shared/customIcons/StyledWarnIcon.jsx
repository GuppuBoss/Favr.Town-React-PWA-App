import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './icons.module.scss';

const StyledWarnIcon = ({ className }) => {
  return (
    <PriorityHighIcon
      className={`${className} ${classes.priorityHighIcon} md-11`}
    />
  );
};

StyledWarnIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default StyledWarnIcon;
