import { statisticsActionTypes } from '../../constants/actionTypes';
import { GET } from '../../services/api';

const getStatistics = (dispatch) => async () => {
  const result = await GET('statistics');
  dispatch({
    type: statisticsActionTypes.GET_STATISTICS_INFO,
    payload: result,
  });
};

export default getStatistics;
