import accountActionTypes, {
  commonActionTypes,
} from '../../constants/actionTypes';
import { DELETE, GET, PATCH } from '../../services/api';

export const getProfile = (dispatch) => async () => {
  const result = await GET('profile');
  dispatch({
    type: accountActionTypes.ACCOUNT_GET_PROFILE,
    payload: result,
  });
};

export const patchProfile = (dispatch, payload) => async () => {
  const result = await PATCH('profile', payload);

  if (result.error) {
    return result;
  }

  dispatch({
    type: accountActionTypes.ACCOUNT_GET_PROFILE,
    payload: result,
  });

  return {};
};

export const addLane = (dispatch, payload) => async () => {
  dispatch({
    type: commonActionTypes.API_FETCH_INPROGRESS,
    payload: true,
  });
  const result = await PATCH('lane', payload);

  if (result.error) {
    dispatch({
      type: commonActionTypes.API_FETCH_INPROGRESS,
      payload: false,
    });

    return result;
  }

  dispatch({
    type: accountActionTypes.ACCOUNT_ADD_LANE,
    payload: result,
  });

  dispatch({
    type: commonActionTypes.API_FETCH_INPROGRESS,
    payload: false,
  });

  return result;
};
export const deleteLane = (dispatch, payload) => async () => {
  dispatch({
    type: commonActionTypes.API_FETCH_INPROGRESS,
    payload: true,
  });
  const result = await DELETE('lane', payload);

  if (result.error) {
    dispatch({
      type: commonActionTypes.API_FETCH_INPROGRESS,
      payload: false,
    });
    return result;
  }

  dispatch({
    type: accountActionTypes.ACCOUNT_DELETE_LANE,
    payload: result,
  });

  dispatch({
    type: commonActionTypes.API_FETCH_INPROGRESS,
    payload: false,
  });
  return result;
};

export const uploadProfilePicture = (dispatch, payload) => async () => {
  dispatch({
    type: commonActionTypes.API_FETCH_INPROGRESS,
    payload: true,
  });

  const result = await PATCH('image', payload);

  if (result.error) {
    return result;
  }

  dispatch({
    type: accountActionTypes.SET_PROFILE_PIC,
    payload: result.item.profilePicture,
  });

  dispatch({
    type: commonActionTypes.API_FETCH_INPROGRESS,
    payload: false,
  });

  return result;
};

export const uploadLogo = (dispatch, payload) => async () => {
  dispatch({
    type: commonActionTypes.API_FETCH_INPROGRESS,
    payload: true,
  });

  const result = await PATCH('image', payload);

  if (result.error) {
    return result;
  }

  dispatch({
    type: accountActionTypes.SET_LOGO,
    payload: result.item.logo,
  });

  dispatch({
    type: commonActionTypes.API_FETCH_INPROGRESS,
    payload: false,
  });

  return result;
};

export const deleteProfilePicture = (dispatch, payload) => async () => {
  dispatch({
    type: commonActionTypes.API_FETCH_INPROGRESS,
    payload: true,
  });

  const result = await DELETE('image', payload);

  if (result.error) {
    return result;
  }

  dispatch({
    type: accountActionTypes.SET_PROFILE_PIC,
    payload: result.item.profilePicture,
  });

  dispatch({
    type: commonActionTypes.API_FETCH_INPROGRESS,
    payload: false,
  });
  return result;
};

export const deleteLogo = (dispatch, payload) => async () => {
  dispatch({
    type: commonActionTypes.API_FETCH_INPROGRESS,
    payload: true,
  });

  const result = await DELETE('image', payload);

  if (result.error) {
    return result;
  }

  dispatch({
    type: accountActionTypes.SET_LOGO,
    payload: result.item.logo,
  });

  dispatch({
    type: commonActionTypes.API_FETCH_INPROGRESS,
    payload: false,
  });
  return result;
};

export default getProfile;
