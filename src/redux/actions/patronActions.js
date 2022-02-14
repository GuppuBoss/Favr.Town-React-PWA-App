import {
  commonActionTypes,
  merchantActionTypes,
  patronActionTypes,
} from '../../constants/actionTypes';
import { DELETE, GET, POST, PUT } from '../../services/api';
import { setGlobalLoadingInProgress } from './commonActions';

export const getSettingsAction = (dispatch) => async () => {
  const result = await GET('settings', { type: 'app' });

  dispatch({
    type: patronActionTypes.GET_PATRON_SETTING,
    payload: result?.item?.source,
  });
};

export const getBusinessSearchResult = (dispatch, payload) => async () => {
  const result = await POST('merchant', payload);

  // dispatch({
  //   type: patronActionTypes.GET_PATRON_SETTING,
  //   payload: result?.item?.source,
  // });

  return result;
};

export const getFollowingMerchantsList = (dispatch, payload) => async () => {
  const result = await POST('merchant', payload);

  // dispatch({
  //   type: patronActionTypes.GET_PATRON_SETTING,
  //   payload: result?.item?.source,
  // });

  return result;
};

export const getCouponList = (dispatch, payload) => async () => {
  const result = await POST('coupon', payload);

  // dispatch({
  //   type: patronActionTypes.GET_PATRON_SETTING,
  //   payload: result?.item?.source,
  // });

  return result;
};

export const getMerchantDetails =
  (dispatch, payload, isGlobalLoading) => async () => {
    if (isGlobalLoading) {
      dispatch({
        type: commonActionTypes.API_FETCH_INPROGRESS,
        payload: true,
      });
    }

    const result = await GET('merchant', payload);

    if (!result?.error) {
      dispatch({
        type: merchantActionTypes.GET_MERCHANT_INFO,
        payload: result,
      });
    }

    if (isGlobalLoading) {
      dispatch({
        type: commonActionTypes.API_FETCH_INPROGRESS,
        payload: false,
      });
    }
    if (result.error) {
      return result;
    }
    return {};
  };

export const setMerchantLocation =
  (dispatch, payload, isGlobalLoading) => async () => {
    if (isGlobalLoading) {
      dispatch({
        type: commonActionTypes.API_FETCH_INPROGRESS,
        payload: true,
      });
    }

    const result = await PUT('location', payload);

    if (!result?.error) {
      dispatch({
        type: merchantActionTypes.GET_MERCHANT_INFO,
        payload: result,
      });
    }

    if (isGlobalLoading) {
      dispatch({
        type: commonActionTypes.API_FETCH_INPROGRESS,
        payload: false,
      });
    }
    if (result.error) {
      return result;
    }
    return {};
  };

export const unfollowMerchant =
  (dispatch, payload, isGlobalLoading) => async () => {
    if (isGlobalLoading) {
      dispatch({
        type: commonActionTypes.API_FETCH_INPROGRESS,
        payload: true,
      });
    }

    const result = await DELETE('merchant', payload);

    if (!result.error) {
      dispatch({
        type: merchantActionTypes.GET_MERCHANT_INFO,
        payload: result,
      });
    }

    if (isGlobalLoading) {
      dispatch({
        type: commonActionTypes.API_FETCH_INPROGRESS,
        payload: false,
      });
    }
    if (result.error) {
      return result;
    }
    return {};
  };

export const shareAction = (dispatch, payload, isGlobalLoading) => async () => {
  if (isGlobalLoading) {
    dispatch({
      type: commonActionTypes.API_FETCH_INPROGRESS,
      payload: true,
    });
  }

  const result = await PUT('action', payload);

  if (isGlobalLoading) {
    dispatch({
      type: commonActionTypes.API_FETCH_INPROGRESS,
      payload: false,
    });
  }
  if (result.error) {
    return result;
  }
  return result;
};

export const deleteCoupon =
  (dispatch, payload, isGlobalLoading) => async () => {
    if (isGlobalLoading) {
      dispatch({
        type: commonActionTypes.API_FETCH_INPROGRESS,
        payload: true,
      });
    }

    const result = await DELETE('coupon', payload);

    if (isGlobalLoading) {
      dispatch({
        type: commonActionTypes.API_FETCH_INPROGRESS,
        payload: false,
      });
    }
    if (result.error) {
      return result;
    }
    return result;
  };
export const getMerchantStore = (dispatch, payload) => async () => {
  const result = await POST('location', payload);

  // dispatch({
  //   type: patronActionTypes.GET_PATRON_SETTING,
  //   payload: result?.item?.source,
  // });

  return result;
};

export const requestAddMerchant = (dispatch, payload) => async () => {
  dispatch(setGlobalLoadingInProgress(dispatch, true));

  const result = await PUT('merchant', payload);

  // dispatch({
  //   type: patronActionTypes.GET_PATRON_SETTING,
  //   payload: result?.item?.source,
  // });

  dispatch(setGlobalLoadingInProgress(dispatch, false));

  return result?.items ? result.items : result;
};
