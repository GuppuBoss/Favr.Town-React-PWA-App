/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import notificationType from '../../../constants/notification';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { PUT } from '../../../services/api';
import getFeedbackMessage from '../../../utils/feedBackUtil';
import toastNotification from '../alerts/toastNotification';
import TextFieldWrapper from '../InputFields/TextField';
import classes from './modal.module.scss';

const schema = yup
  .object({
    message: yup.string().required('is Required'),
  })
  .required();

const SupportModal = (props) => {
  const dispatch = useDispatch();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [isSupportButtonDisabled, setIsSupportButtonDisabled] = useState(true);

  useEffect(() => {
    if (isValid) {
      setIsSupportButtonDisabled(false);
    } else {
      setIsSupportButtonDisabled(true);
    }
  }, [isValid]);

  const onSubmit = async (data) => {
    try {
      const body = {
        message: data.message,
      };
      const result = await dispatch(
        globalLoaderWrapper(dispatch, PUT, 'support', body)
      );
      const feedbackMessage = getFeedbackMessage(result);

      toastNotification({
        type: result?.error ? notificationType.ERROR : notificationType.SUCCESS,
        message: feedbackMessage,
      });
      reset({ message: '' });
      props.handleClose(false);
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  };

  return (
    <Dialog onClose={props.handleClose} open={props.isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.modalWrapper}>
          <DialogTitle disableTypography>
            <Typography variant="h6">How can we help?</Typography>
            <IconButton
              aria-label="close"
              className="margin-left-auto"
              onClick={props.handleClose}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent className="remove-side-padding">
            <TextFieldWrapper
              autoUpdate={false}
              control={control}
              error={errors.message}
              fullWidth
              isPassword={false}
              maxRows={6}
              minRows={3}
              multiline
              name="message"
            />
          </DialogContent>

          <DialogActions className="remove-side-padding">
            <div className={classes.modalButtonWrapper}>
              <button
                className={classes.normalButtonWrapper}
                disabled={isSupportButtonDisabled}
                type="submit"
              >
                CONTACT SUPPORT
              </button>
            </div>
          </DialogActions>
        </div>
      </form>
    </Dialog>
  );
};

export default SupportModal;

SupportModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
