import { rulesActionTypes } from '../../constants/actionTypes';
import { GET, PATCH } from '../../services/api';

const getRules = (dispatch) => async () => {
  const result = await GET('rule');
  dispatch({
    type: rulesActionTypes.GET_RULES_INFO,
    payload: result,
  });
};

export const patchRules = (dispatch, payload) => async () => {
  const result = await PATCH('rule', payload);

  if (result.error) {
    return result;
  }

  dispatch({
    type: rulesActionTypes.GET_RULES_INFO,
    payload: result,
  });

  return {};
};

export default getRules;
