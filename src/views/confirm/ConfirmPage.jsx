import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import toastNotification from '../../components/shared/alerts/toastNotification';
import MerchantHeaderB from '../../components/shared/headers/MerchantHeaderB';
import PartonHeaderB from '../../components/shared/headers/PartonHeaderB';
import notificationType from '../../constants/notification';
import userGroupsTypes from '../../constants/users';
import { getAuthenticatedUser } from '../../redux/selectors/accountSelector';
import { GET } from '../../services/api';
import getUserGroup from '../../utils/authUtil';
import getFeedbackMessage from '../../utils/feedBackUtil';
import { getContentHeight } from '../../utils/window';
import classes from './confirmPage.module.scss';
import ConfirmPageFooter from './ConfirmPageFooter';

const ConfirmPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { dirtyFields },
  } = useForm({ mode: 'onChange' });
  const [email, setEmail] = useState();

  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);

  useEffect(async () => {
    try {
      const result = await GET('init');
      if (!isEmpty(result) && result.item) {
        setEmail(result.item.email);
      }
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  }, []);

  const handleNewCodeRequest = async () => {
    const additionalParams = { code: 'new' };
    try {
      const data = await GET('confirm', additionalParams);
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

  const handleCodeConfirm = async () => {
    const code = getValues('code');
    const additionalParams = { code };
    try {
      const data = await GET('confirm', additionalParams);
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
    <div className={classes.confirmPageWrapper}>
      {userGroup === userGroupsTypes.PATRON ? (
        <PartonHeaderB />
      ) : (
        <MerchantHeaderB />
      )}
      <div
        className={classes.confirmContainer}
        style={{ height: getContentHeight() }}
      >
        <form
          className={classes.confirmPageFromContainer}
          id="confirmForm"
          onSubmit={handleSubmit}
        >
          <div className={classes.formInputWrapper}>
            <input
              className={classes.inputField}
              defaultValue={email}
              name="login"
              placeholder="Check email with spam folder"
              readOnly
              type="text"
            />
          </div>
          <div className={classes.formInputWrapper}>
            <div>
              <input
                className={classes.inputField}
                name="code"
                type="text"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('code', { required: true })}
                placeholder="Confirmation code"
              />
            </div>
          </div>
        </form>
      </div>
      <ConfirmPageFooter
        handleCodeConfirm={handleCodeConfirm}
        handleNeCodeRequest={handleNewCodeRequest}
        isDirtyCode={dirtyFields.code ? dirtyFields.code : false}
      />
    </div>
  );
};

export default ConfirmPage;
