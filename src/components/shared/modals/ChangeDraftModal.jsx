/* eslint-disable jsx-a11y/label-has-associated-control */
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

import notificationType from '../../../constants/notification';
import toastNotification from '../alerts/toastNotification';
import classes from './modal.module.scss';

const ChangeDraftModal = (props) => {
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    try {
      const result = await props.updateFunction({ draft: false });

      toastNotification({
        type: notificationType.SUCCESS,
        message: result.message,
      });

      props.handleClose();
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: error?.message || 'Something went wrong',
      });
    }
  };

  return (
    <Dialog onClose={props.handleClose} open={props.isOpen}>
      <div className={classes.modalWrapper}>
        <MuiDialogTitle disableTypography>
          <Typography variant="h6">ARE YOU SURE?</Typography>
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
            <label className={classes.modalInputLabel} htmlFor="login">
              This will make the survey visible so your patrons can start
              voting.
            </label>
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

export default ChangeDraftModal;

ChangeDraftModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  updateFunction: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
