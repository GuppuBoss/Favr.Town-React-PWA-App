/* eslint-disable react/jsx-max-depth */

import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import UploadIcon from '../../../assets/images/icons/icon_upload.svg';
import toastNotification from '../../../components/shared/alerts/toastNotification';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import InputField from '../../../components/shared/InputFields/TextField';
import notificationType from '../../../constants/notification';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { PATCH } from '../../../services/api';
import getFeedbackMessage from '../../../utils/feedBackUtil';
import classes from '../list/locations.module.scss';
import schema from './loginFormSchema';

const NewLoginForm = ({ handleClose, setLocation }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { handleSubmit, formState, control } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PATCH, 'login', data, params)
    );

    if (response?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }

    if (!response?.error) {
      const feedbackMessage = getFeedbackMessage(response);
      toastNotification({
        type: notificationType.SUCCESS,
        message: feedbackMessage,
      });
      setLocation(response.item);
      handleClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">Add cashier login</Typography>
        <IconButton
          aria-label="close"
          className="margin-left-auto"
          onClick={() => handleClose(false)}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>

      <DialogContent className="remove-side-padding">
        <Grid
          className={classes.gridRoot}
          container
          justifyContent="space-between"
          spacing={2}
        >
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate={false}
              control={control}
              error={formState.errors.login}
              fullWidth
              isPassword={false}
              label="login/username"
              name="login"
            />
          </Grid>

          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate={false}
              control={control}
              error={formState.errors.email}
              fullWidth
              isPassword={false}
              label="email"
              name="email"
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate={false}
              control={control}
              error={formState.errors.password}
              fullWidth
              isPassword={false}
              label="password"
              name="password"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="remove-side-padding">
        <Grid container justifyContent="flex-end">
          <Grid className={classes.buttonWrapper} item>
            <Button
              aria-label="log-out"
              className={classes.iconButton}
              type="submit"
            >
              <StandardIcon alt="upload" src={UploadIcon} />
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </form>
  );
};

NewLoginForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
};

export default NewLoginForm;
