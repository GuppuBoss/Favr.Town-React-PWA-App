/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-perf/jsx-no-jsx-as-prop */
import 'react-toastify/dist/ReactToastify.css';

import { Auth } from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import { StyledEngineProvider } from '@mui/material/styles';
import React, { useEffect } from 'react';
import PWAPrompt from 'react-ios-pwa-prompt';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useDeepCompareEffect from 'use-deep-compare-effect';

import notificationType from '../../constants/notification';
// import ROUTES from '../../constants/routes';
import { getCurrentUser } from '../../redux/actions/accountActions';
import {
  getIsAuthenticated,
  getIsAuthenticationInProgress,
  getIsGlobalLoading,
  getUserData,
} from '../../redux/selectors/accountSelector';
import TotalRoutes from '../../routes/Routes';
import AWSConfig from '../../services/awsConfig';
import useNetwork from '../../utils/useNetwork';
import SignInPage from '../../views/signIn/SignInPage';
import AlertBar from '../shared/alerts/AlertBar';
import toastNotification from '../shared/alerts/toastNotification';
import GlobalSpinner from '../shared/spinners/GlobalSpinner';

Amplify.configure({
  Auth: {
    identityPoolId: AWSConfig.IdentityPoolId,
    region: AWSConfig.region,
    userPoolId: AWSConfig.UserPoolId,
    userPoolWebClientId: AWSConfig.ClientId,
  },
});

Auth.configure(AWSConfig);

const App = () => {
  const dispatch = useDispatch();
  const isOnline = useNetwork();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isGlobalLoading = useSelector(getIsGlobalLoading);
  const isAuthenticationInProgress = useSelector(getIsAuthenticationInProgress);
  const userData = useSelector(getUserData);
  // const navigate = useNavigate();
  // const { history } = window;
  const notificationArray = userData?.notifications;
  useEffect(async () => {
    await dispatch(getCurrentUser(dispatch));
    // history.length = 1;
  }, []);
  console.log('IS AUTHENTICATED: ', isAuthenticated);
  // Need to fix double rendering of notification after sign in.
  useDeepCompareEffect(() => {
    if (notificationArray) {
      // eslint-disable-next-line array-callback-return
      userData.notifications.map((notification) => {
        toastNotification({
          type: notificationType.DEFAULT,
          message: notification,
        });
      });
    }
  }, [notificationArray, {}]);

  return (
    <StyledEngineProvider injectFirst>
      {!isOnline && (
        <AlertBar message="Internet connection required" severity="info" />
      )}
      <PWAPrompt
        copyClosePrompt="Close"
        permanentlyHideOnDismiss={false}
        promptOnVisit={5}
        timesToShow={10}
      />
      <ToastContainer
        autoClose={1200}
        closeOnClick
        draggable={false}
        hideProgressBar
        newestOnTop={false}
        pauseOnFocusLoss
        position="top-right"
        rtl={false}
      />
      {(isGlobalLoading || isAuthenticationInProgress) && (
        <GlobalSpinner isOpen={isGlobalLoading || isAuthenticationInProgress} />
      )}
      {!isAuthenticationInProgress &&
        (isAuthenticated ? (
          <TotalRoutes isAuthenticated={isAuthenticated} />
        ) : (
          <Routes>
            <Route element={<SignInPage />} path="*" />
          </Routes>
        ))}
    </StyledEngineProvider>
  );
};

export default App;
