import React from 'react';
import { useSelector } from 'react-redux';

import userGroupsTypes from '../../constants/users';
import { getAuthenticatedUser } from '../../redux/selectors/accountSelector';
import getUserGroup from '../../utils/authUtil';
import MerchantProfile from './merchant/Profile';
import PatronProfile from './patron/Profile';

const Index = () => {
  const userInfo = useSelector(getAuthenticatedUser);

  const userGroup = getUserGroup(userInfo);

  if (userGroup === userGroupsTypes.PATRON) {
    return <PatronProfile />;
  }
  if (userGroup === userGroupsTypes.MERCHANT) {
    return <MerchantProfile />;
  }

  return null;
};

export default Index;
