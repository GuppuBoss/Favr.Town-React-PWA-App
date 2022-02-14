import React from 'react';
import { useSelector } from 'react-redux';

import StandardFooter from '../../components/shared/footers/StandardFooter';
import MerchantHeaderB from '../../components/shared/headers/MerchantHeaderB';
import PartonHeaderB from '../../components/shared/headers/PartonHeaderB';
import userGroupsTypes from '../../constants/users';
import { getAuthenticatedUser } from '../../redux/selectors/accountSelector';
import getUserGroup from '../../utils/authUtil';
import { getContentHeight } from '../../utils/window';
import PasswordForm from './PasswordForm';
import classes from './passwordPage.module.scss';

const PasswordPage = () => {
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);
  return (
    <div className={classes.passwordPageWrapper}>
      {userGroup === userGroupsTypes.PATRON ? (
        <PartonHeaderB />
      ) : (
        <MerchantHeaderB />
      )}
      <div
        className={classes.passwordPageContainer}
        style={{ height: getContentHeight() }}
      >
        <PasswordForm />
      </div>
      <StandardFooter />
    </div>
  );
};

export default PasswordPage;
