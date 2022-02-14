import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './footer.module.scss';

const FooterButton = (props) => {
  return (
    <div className={classes.buttonWrapper}>
      <Button
        aria-label="button"
        className={classes.iconButton}
        disabled={props.isDisabled}
        onClick={props.onClick}
        type={props.type || 'submit'}
      >
        {props.children}
      </Button>
    </div>
  );
};

FooterButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default FooterButton;
