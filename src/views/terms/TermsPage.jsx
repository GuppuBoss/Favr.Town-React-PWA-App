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
import classes from './termsPage.module.scss';

const TermsPage = () => {
  const [items, setItems] = useState();
  const dispatch = useDispatch();

  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);

  useEffect(async () => {
    try {
      const terms = await dispatch(globalLoaderWrapper(dispatch, GET, 'terms'));
      if (terms && terms.item && terms.item.service) {
        setItems(terms.item.service);
      }
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  }, []);

  return (
    <div className={classes.termsPageWrapper}>
      {userGroup === userGroupsTypes.PATRON ? (
        <PartonHeaderB />
      ) : (
        <MerchantHeaderB />
      )}
      <div className={classes.termsContentWrapper}>
        <div className={classes.termsWrapper}>
          {items && (
            <div className={classes.termsItemsContentWrapper}>
              <p className={classes.termsOfService}>{items}</p>;
            </div>
          )}
        </div>
      </div>

      <StandardFooter />
    </div>
  );
};

export default TermsPage;
