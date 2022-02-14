import { programActionTypes } from '../../constants/actionTypes';
import { GET } from '../../services/api';

const getProgram = (dispatch) => async () => {
  const result = await GET('program');
  dispatch({
    type: programActionTypes.GET_PROGRAM_INFO,
    payload: result,
  });
};

export default getProgram;
