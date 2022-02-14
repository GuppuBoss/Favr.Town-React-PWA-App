import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './profile.module.scss';

const ModalTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};
ModalTitle.propTypes = {
  children: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalTitle;
