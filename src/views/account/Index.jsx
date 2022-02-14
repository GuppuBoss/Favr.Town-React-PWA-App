import React from 'react';
import { useSelector } from 'react-redux';

import userGroupsTypes from '../../constants/users';
import { getAuthenticatedUser } from '../../redux/selectors/accountSelector';
import getUserGroup from '../../utils/authUtil';
import MerchantAccount from './MerchantAccount';
import PatronAccount from './PatronAccount';

const Index = () => {
  const userInfo = useSelector(getAuthenticatedUser);

  const userGroup = getUserGroup(userInfo);

  if (userGroup === userGroupsTypes.PATRON) {
    return <PatronAccount />;
  }
  if (userGroup === userGroupsTypes.MERCHANT) {
    return <MerchantAccount />;
  }

  return null;
};

export default Index;
