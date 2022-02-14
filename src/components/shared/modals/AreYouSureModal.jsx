/* eslint-disable react/jsx-max-depth */
/* eslint-disable jsx-a11y/label-has-associated-control */
import CloseIcon from '@mui/icons-material/Close';
import {
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

import notificationType from '../../../constants/notification';
import { DELETE } from '../../../services/api';
import getFeedbackMessage from '../../../utils/feedBackUtil';
import toastNotification from '../alerts/toastNotification';
import StandardButton from '../buttons/StandardButton';
import TextFieldWrapper from '../InputFields/TextField';
import classes from './modal.module.scss';

const AreYouSureModal = (props) => {
  const { handleSubmit, control, formState } = useForm();
  const path = props?.path || 'confirm';

  const onSubmit = async (data) => {
    try {
      const result = await DELETE(path, { data }, props.queryParam);
      const feedbackMessage = getFeedbackMessage(result);

      toastNotification({
        type: result?.error ? notificationType.ERROR : notificationType.SUCCESS,
        message: feedbackMessage,
      });
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <DialogContent className="remove-side-padding">
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <TextFieldWrapper
                  autoUpdate={false}
                  control={control}
                  error={formState.errors.message}
                  fullWidth
                  label="Message"
                  maxRows={6}
                  minRows={3}
                  multiline
                  name="message"
                />
              </Grid>
              {/* <textarea
              className={classes.modalInput}
              maxLength="500"
              minLength="2"
              name="message"
              type="text"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('message')}
            /> */}
            </Grid>
          </DialogContent>
          <DialogActions className="remove-side-padding">
            <Grid container justifyContent="space-between">
              <StandardButton
                onClick={props.handleClose}
                type="submit"
                variant="outlined"
              >
                CANCEL
              </StandardButton>
              <StandardButton
                aria-label="log-out"
                type="submit"
                variant="outlined"
              >
                CONFIRM
              </StandardButton>
            </Grid>
          </DialogActions>
        </div>
      </Dialog>
    </form>
  );
};

export default AreYouSureModal;

AreYouSureModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  queryParam: PropTypes.string.isRequired,
};
