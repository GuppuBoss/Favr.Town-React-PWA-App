import { combineReducers } from 'redux';

import { accountReducer } from '../reducers/accountReducer';

const createRootReducer = () => {
  return combineReducers({
    account: accountReducer,
  });
};

export default createRootReducer;
