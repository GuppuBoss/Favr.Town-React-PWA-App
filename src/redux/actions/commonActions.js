import { commonActionTypes } from '../../constants/actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const setGlobalLoadingInProgress = (dispatch, payload) => () => {
  dispatch({
    type: commonActionTypes.API_FETCH_INPROGRESS,
    payload,
  });
};

export const globalLoaderWrapper =
  (dispatch, apiCall, path, payload, param, isUnauthenticatedApiCall) =>
  async () => {
    dispatch({
      type: commonActionTypes.API_FETCH_INPROGRESS,
      payload: true,
    });

    try {
      const data = await apiCall(
        path,
        payload,
        param,
        isUnauthenticatedApiCall
      );

      dispatch({
        type: commonActionTypes.API_FETCH_INPROGRESS,
        payload: false,
      });

      return data;
    } catch (e) {
      dispatch({
        type: commonActionTypes.API_FETCH_INPROGRESS,
        payload: false,
      });

      return e;
    }
  };
