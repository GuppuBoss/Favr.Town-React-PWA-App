/* eslint-disable jsx-a11y/label-has-associated-control */
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

import classes from './modal.module.scss';

const GenericAreYouSureModal = (props) => {
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    await props.onSubmit();
  };

  return (
    <Dialog onClose={props.handleClose} open={props.isOpen}>
      <div className={classes.modalWrapper}>
        <MuiDialogTitle disableTypography>
          {props.warning && <Typography variant="h6">ARE YOU SURE?</Typography>}
          <IconButton
            aria-label="close"
            className="margin-left-auto"
            onClick={props.handleClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.modalInputWrapperAlignCenter}>
            {!props.warning && (
              <label className={classes.modalInputLabel} htmlFor="login">
                ARE YOU SURE?
              </label>
            )}

            {props.warning && (
              <label className={classes.modalInputLabel} htmlFor="login">
                {props.warning}
              </label>
            )}
          </div>
          <div className={classes.areYouSureModalButtonWrapper}>
            <button
              className={classes.normalButtonWrapper}
              onClick={props.handleClose}
              type="button"
            >
              CANCEL
            </button>
            <button className={classes.normalButtonWrapper} type="submit">
              CONFIRM
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default GenericAreYouSureModal;

GenericAreYouSureModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  warning: PropTypes.string.isRequired,
};
