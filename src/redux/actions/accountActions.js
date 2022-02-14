import accountActionTypes from '../../constants/actionTypes';
import { GET } from '../../services/api';
import * as AwsAuthentication from '../../services/awsAuthentication';
import { setGlobalLoadingInProgress } from './commonActions';

export const setIsAuthenticationInProgress = (dispatch, payload) => () => {
  dispatch({
    type: accountActionTypes.ACCOUNT_SET_AUTHENTICATION_INPROGRESS,
    payload,
  });
};
export const authenticateUser = (dispatch, username, password) => async () => {
  dispatch(setGlobalLoadingInProgress(dispatch, true));
  try {
    const currentAuthenticatedUser = await AwsAuthentication.signIn(
      username,
      password
    );

    const result = await GET('init');

    dispatch({
      type: accountActionTypes.ACCOUNT_SET_USER_DATA,
      payload: result,
    });

    dispatch({
      type: accountActionTypes.ACCOUNT_SET_AUTHENTICATED_USER,
      payload: currentAuthenticatedUser,
    });

    dispatch(setGlobalLoadingInProgress(dispatch, false));

    return result;
  } catch (error) {
    dispatch(setGlobalLoadingInProgress(dispatch, false));
    return error;
  }
};

export const getCurrentUser = (dispatch) => async () => {
  dispatch(setIsAuthenticationInProgress(dispatch, true));
  try {
    const currentAuthenticatedUser =
      await AwsAuthentication.getCurrentAuthenticatedUser();
    dispatch({
      type: accountActionTypes.ACCOUNT_SET_AUTHENTICATED_USER,
      payload: currentAuthenticatedUser,
    });
    const result = await GET('init');
    dispatch({
      type: accountActionTypes.ACCOUNT_SET_USER_DATA,
      payload: result,
    });
    dispatch(setIsAuthenticationInProgress(dispatch, false));
  } catch (error) {
    dispatch(setIsAuthenticationInProgress(dispatch, false));
  }
};

export const signOutUser = (dispatch) => async () => {
  await AwsAuthentication.signOut();
  dispatch({
    type: accountActionTypes.ACCOUNT_SIGN_OUT_AUTHENTICATED_USER,
    payload: null,
  });
  dispatch({
    type: accountActionTypes.ACCOUNT_SET_USER_DATA,
    payload: null,
  });
};
