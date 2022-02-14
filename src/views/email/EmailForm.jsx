/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import toastNotification from '../../components/shared/alerts/toastNotification';
import InputField from '../../components/shared/InputFields/TextField';
import notificationType from '../../constants/notification';
import { globalLoaderWrapper } from '../../redux/actions/commonActions';
import { GET, PATCH } from '../../services/api';
import getFeedbackMessage from '../../utils/feedBackUtil';
import schema from './emailFormSchema';
import classes from './emailPage.module.scss';

const EmailForm = () => {
  const dispatch = useDispatch();

  const {
    control,
    getValues,
    formState: { errors, dirtyFields, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleRequestCode = async () => {
    try {
      const email = getValues('email');
      const data = await dispatch(
        globalLoaderWrapper(dispatch, PATCH, 'confirm', { email })
      );
      const feedbackMessage = getFeedbackMessage(data);
      toastNotification({
        type: data?.error ? notificationType.ERROR : notificationType.SUCCESS,
        message: feedbackMessage,
      });
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  };

  const handleConfirmCode = async () => {
    try {
      const code = getValues('code');
      const data = await dispatch(
        globalLoaderWrapper(dispatch, GET, 'confirm', { code })
      );
      const feedbackMessage = getFeedbackMessage(data);
      toastNotification({
        type: data?.error ? notificationType.ERROR : notificationType.SUCCESS,
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
    <div>
      <form className={classes.formContainer}>
        <div className={classes.formInputWrapper}>
          <div>
            <Grid item sm={12} xs={12}>
              <InputField
                control={control}
                error={errors.email}
                fullWidth
                label="New Email"
                name="email"
              />
            </Grid>
          </div>
        </div>
        <div className={classes.buttonWrapper}>
          <button
            className={classes.normalButtonWrapper}
            disabled={errors.email || !dirtyFields.email}
            onClick={handleRequestCode}
            type="button"
          >
            REQUEST CODE
          </button>
        </div>
        <div className={classes.inputErrorWrapper}>
          YOU MUST CONFIRM YOUR ACCOUNT AGAIN USING THE CONFIRMATION CODE/URL
          RECEIVED TO THE NEW EMAIL
        </div>
        <div className={classes.formInputWrapper}>
          <div>
            <Grid item sm={12} xs={12}>
              <InputField
                control={control}
                error={errors.code}
                fullWidth
                label="Confirmation code"
                name="code"
              />
            </Grid>
          </div>
        </div>
        <div className={classes.buttonWrapper}>
          <button
            className={classes.normalButtonWrapper}
            disabled={!isValid}
            onClick={handleConfirmCode}
            type="button"
          >
            CONFIRM
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
