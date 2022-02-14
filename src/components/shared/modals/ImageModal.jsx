/* eslint-disable jsx-a11y/label-has-associated-control */
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './modal.module.scss';

const ImageModal = (props) => {
  return (
    <Dialog
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
      onClose={props.handleClose}
      open={props.isOpen}
      scroll="paper"
    >
      <div className={classes.modalWrapper}>
        <MuiDialogTitle disableTypography>
          <IconButton
            aria-label="close"
            className="margin-left-auto"
            onClick={() => props.handleClose(false)}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <img
          alt="album"
          src={props.image}
          style={{ maxWidth: '400px', width: '100%' }}
        />
      </div>
    </Dialog>
  );
};

export default ImageModal;

ImageModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
};
