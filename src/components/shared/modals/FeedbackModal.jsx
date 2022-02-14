/* eslint-disable jsx-a11y/label-has-associated-control */
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './modal.module.scss';

const FeedbackModal = (props) => {
  return (
    <Dialog onClose={props.handleClose} open={props.isOpen}>
      <div className={classes.modalWrapper}>
        <div className={classes.closeIconWrapper}>
          <CloseIcon fontSize="large" onClick={props.handleClose} />
        </div>
        {props.errorMessage && (
          <div className={classes.licenseWrapper}>
            <p className={classes.modal_repoWrapper}>{props.errorMessage}</p>
          </div>
        )}
        {props.successMessage && (
          <div className={classes.successMessage}>
            <p className={classes.modal_repoWrapper}>{props.successMessage}</p>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default FeedbackModal;

FeedbackModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
};
