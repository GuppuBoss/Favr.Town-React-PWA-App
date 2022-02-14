/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import toastNotification from '../../components/shared/alerts/toastNotification';
import InputField from '../../components/shared/InputFields/TextField';
import notificationType from '../../constants/notification';
import { globalLoaderWrapper } from '../../redux/actions/commonActions';
import { PATCH } from '../../services/api';
import getFeedbackMessage from '../../utils/feedBackUtil';
import schema from './passwordFormSchema';
import classes from './passwordPage.module.scss';

const ConfirmForm = () => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (!isEmpty(data)) {
        const { password } = data;
        const body = { password };
        const result = await dispatch(
          globalLoaderWrapper(dispatch, PATCH, 'confirm', body)
        );
        const feedbackMessage = getFeedbackMessage(result);
        toastNotification({
          type: data?.error ? notificationType.ERROR : notificationType.SUCCESS,
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
    <div className={classes.passwordFormWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.formInputWrapper}>
          <div>
            <InputField
              control={control}
              error={errors.password}
              fullWidth
              isPassword
              label="New password"
              name="password"
            />
          </div>
        </div>
        <div className={classes.buttonWrapper}>
          <button
            className={classes.normalButtonWrapper}
            disabled={!isValid}
            type="submit"
          >
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmForm;
