import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import toastNotification from '../../components/shared/alerts/toastNotification';
import StandardFooter from '../../components/shared/footers/StandardFooter';
import MerchantHeaderB from '../../components/shared/headers/MerchantHeaderB';
import PartonHeaderB from '../../components/shared/headers/PartonHeaderB';
import notificationType from '../../constants/notification';
import userGroupsTypes from '../../constants/users';
import { globalLoaderWrapper } from '../../redux/actions/commonActions';
import { getAuthenticatedUser } from '../../redux/selectors/accountSelector';
import { GET } from '../../services/api';
import getUserGroup from '../../utils/authUtil';
import classes from './privacyPage.module.scss';

const PrivacyPage = () => {
  const [items, setItems] = useState();
  const dispatch = useDispatch();
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);

  useEffect(async () => {
    try {
      const privacy = await dispatch(
        globalLoaderWrapper(dispatch, GET, 'terms')
      );

      if (privacy && privacy.item && privacy.item.privacy) {
        setItems(privacy.item.privacy);
      }
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  }, []);

  return (
    <div className={classes.privacyPageWrapper}>
      {userGroup === userGroupsTypes.PATRON ? (
        <PartonHeaderB />
      ) : (
        <MerchantHeaderB />
      )}
      <div className={classes.privacyContentWrapper}>
        <div className={classes.privacyWrapper}>
          {items && (
            <div className={classes.privacyItemsContentWrapper}>
              <p className={classes.privacyStatement}>{items}</p>
            </div>
          )}
        </div>
      </div>
      <StandardFooter />
    </div>
  );
};

export default PrivacyPage;
