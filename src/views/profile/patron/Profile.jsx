import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import StandardFooter from '../../../components/shared/footers/StandardFooter';
import MerchantHeaderB from '../../../components/shared/headers/MerchantHeaderB';
import PartonHeaderB from '../../../components/shared/headers/PartonHeaderB';
import notificationType from '../../../constants/notification';
import userGroupType from '../../../constants/users';
import { getProfile } from '../../../redux/actions/profileActions';
import {
  getAuthenticatedUser,
  getUserData,
} from '../../../redux/selectors/accountSelector';
import getUserGroup from '../../../utils/authUtil';
import classes from './profile.module.scss';
import ProfileForm from './ProfileForm';

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);

  useEffect(async () => {
    try {
      dispatch(getProfile(dispatch));
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  }, []);

  const getHeader = (userType) => {
    if (userType === userGroupType.PATRON) {
      return <PartonHeaderB />;
    }

    if (userType === userGroupType.MERCHANT) {
      return <MerchantHeaderB />;
    }
    return <MerchantHeaderB />;
  };

  const getContentHeight = () => {
    const windowViewPoint = window.innerHeight;
    const heightOfFooter = 180;

    return windowViewPoint - heightOfFooter;
  };

  return (
    <div className={classes.profilePageWrapper}>
      {getHeader(userGroup)}
      <div
        className={classes.profileContainer}
        style={{ height: getContentHeight() }}
      >
        {userData.item && <ProfileForm defaultValues={userData.item} />}
      </div>
      <StandardFooter />
    </div>
  );
};

export default Profile;
