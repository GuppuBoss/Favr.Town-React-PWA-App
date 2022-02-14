/* eslint-disable no-unused-vars */
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import toastNotification from '../../components/shared/alerts/toastNotification';
import NeutralHeader from '../../components/shared/headers/NeutralHeader';
import ForgetPasswordModal from '../../components/shared/modals/ForgetPasswordModal';
import notificationType from '../../constants/notification';
import ROUTES from '../../constants/routes';
import userGroupsTypes from '../../constants/users';
import { authenticateUser } from '../../redux/actions/accountActions';
import { getAuthenticatedUser } from '../../redux/selectors/accountSelector';
import { getContentHeight } from '../../utils/window';
import classes from './signIn.module.scss';
import SignInForm from './SignInForm';
import SignInPageFooter from './SignInPageFooter';

const SignInPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const [isDisabledJoin, setIsDisabledJoin] = useState(false);
  const [isDisabledSignIn, setIsDisabledSignIn] = useState(true);

  const authenticatedUser = useSelector(getAuthenticatedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { history } = window;

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleJoinButton = () => {
    window.location.replace(
      process.env.REACT_APP_STAGE === 'dev'
        ? 'https://dev.favr.town/'
        : 'https://favr.town/'
    );
  };

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(
        authenticateUser(dispatch, data.login, data.password)
      );

      if (response?.stack) {
        toastNotification({
          type: notificationType.ERROR,
          message: response?.message,
        });
      }
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  };
  useEffect(() => {
    if (isEmpty(authenticatedUser)) {
      return;
    }

    try {
      const userCognitoGroup =
        authenticatedUser.signInUserSession.accessToken.payload[
          'cognito:groups'
        ][0];
      const queryParam = Object.fromEntries(
        new URLSearchParams(location.search)
      );

      if (queryParam?.redirectpath) {
        const redirectPath = queryParam?.search
          ? `${queryParam?.redirectpath}${queryParam.search}`
          : queryParam?.redirectpath;
        navigate(redirectPath);
        history.length = 1;
        return;
      }
      if (userCognitoGroup === userGroupsTypes.PATRON) {
        navigate(ROUTES.PATRON);
        return;
      }
      if (userCognitoGroup === userGroupsTypes.MERCHANT) {
        navigate(ROUTES.MERCHANT);
      }
      if (userCognitoGroup === userGroupsTypes.CASHIER) {
        navigate(ROUTES.QR);
      }
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
      navigate(ROUTES.SIGN_IN);
    }
  }, [authenticatedUser]);

  return (
    <div className={classes.signinPageWrapper}>
      <NeutralHeader />
      <div
        className={classes.signinPageContainer}
        style={{ height: getContentHeight() }}
      >
        <SignInForm
          handleOpen={handleOpen}
          onSubmit={onSubmit}
          setIsDisabledJoin={setIsDisabledJoin}
          setIsDisabledSignIn={setIsDisabledSignIn}
        />
      </div>
      <SignInPageFooter
        handleJoinButton={handleJoinButton}
        isDisabledJoin={isDisabledJoin}
        isDisabledSignIn={isDisabledSignIn}
      />
      {isOpen && (
        <ForgetPasswordModal handleClose={handleClose} isOpen={isOpen} />
      )}
    </div>
  );
};

export default SignInPage;
