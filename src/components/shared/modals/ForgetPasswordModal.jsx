/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import notificationType from '../../../constants/notification';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { PUT } from '../../../services/api';
import getFeedbackMessage from '../../../utils/feedBackUtil';
import schema from '../../../views/signIn/ForgotPasswordFormSchema';
import toastNotification from '../alerts/toastNotification';
import TextFieldWrapper from '../InputFields/TextField';
import classes from './modal.module.scss';

const ForgetPasswordModal = (props) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const body = { loginOrEmail: data.loginOrEmail };
      const result = await dispatch(
        globalLoaderWrapper(dispatch, PUT, 'signup', body, undefined, true)
      );
      const feedbackMessage = getFeedbackMessage(result);
      if (_.isEmpty(result)) {
        toastNotification({
          type: notificationType.ERROR,
          message: feedbackMessage,
        });
      } else if (result.message) {
        toastNotification({
          type: notificationType.SUCCESS,
          message: feedbackMessage,
        });
        props.handleClose();
      } else {
        toastNotification({
          type: notificationType.ERROR,
          message: feedbackMessage,
        });
      }
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  };

  return (
    <Dialog onClose={props.handleClose} open={props.isOpen}>
      <form id="forget_password_modal_form" onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.modalWrapper}>
          <MuiDialogTitle disableTypography>
            <Typography variant="h6">FORGOT PASSWORD?</Typography>
            <IconButton
              aria-label="close"
              className="margin-left-auto"
              onClick={props.handleClose}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>

          <DialogContent className="remove-side-padding">
            <div className={classes.modalInputWrapper}>
              <TextFieldWrapper
                autoUpdate={false}
                control={control}
                label="Login or Email"
                name="loginOrEmail"
              />
            </div>
            <div className={classes.forgetPasswordStaticTextWrapper}>
              This will send a temporary password to the registered email
              address for this account.
            </div>
          </DialogContent>
          <DialogActions className="remove-side-padding">
            <button
              className={classes.normalButtonWrapper}
              disabled={!isValid}
              form="forget_password_modal_form"
              type="submit"
            >
              REQUEST
            </button>
          </DialogActions>
        </div>
      </form>
    </Dialog>
  );
};

export default ForgetPasswordModal;

ForgetPasswordModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
