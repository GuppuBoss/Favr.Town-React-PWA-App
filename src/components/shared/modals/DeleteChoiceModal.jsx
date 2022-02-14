/* eslint-disable jsx-a11y/label-has-associated-control */
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import notificationType from '../../../constants/notification';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { DELETE } from '../../../services/api';
import getFeedbackMessage from '../../../utils/feedBackUtil';
import toastNotification from '../alerts/toastNotification';
import classes from './modal.module.scss';

const DeleteChoiceModal = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const path = props?.path || 'confirm';

  const onSubmit = async () => {
    try {
      const result = await dispatch(
        globalLoaderWrapper(
          dispatch,
          DELETE,
          path,
          {},
          { sk: props.sk, id: props.id }
        )
      );
      props.setSurvey(result);
      // const result = await DELETE(path, {}, { sk: props.sk, id: props.id });
      const feedbackMessage = getFeedbackMessage(result);

      toastNotification({
        type: result?.error ? notificationType.ERROR : notificationType.SUCCESS,
        message: feedbackMessage,
      });

      props.handleClose();
    } catch (error) {
      toastNotification({
        type: notificationType.SUCCESS,
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
              This will remove the selected choice.
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

export default DeleteChoiceModal;

DeleteChoiceModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  setSurvey: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  sk: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
