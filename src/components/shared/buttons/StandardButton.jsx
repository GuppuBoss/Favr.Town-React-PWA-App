import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './standardButton.module.scss';

const StandardButton = (props) => {
  return (
    <Button
      className={
        props.className
          ? `${classes.normalButtonWrapper} ${props.className}`
          : classes.normalButtonWrapper
      }
      disabled={props.isDisabled}
      onClick={props.onClick}
      variant="contained"
    >
      {props.children}
    </Button>
  );
};

StandardButton.propTypes = {
  children: PropTypes.element.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StandardButton;
