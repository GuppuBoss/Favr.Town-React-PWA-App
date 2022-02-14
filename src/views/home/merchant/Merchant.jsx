import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import React from 'react';
import { useSelector } from 'react-redux';

import MerchantFooter from '../../../components/shared/footers/MerchantFooter';
import CashierHeader from '../../../components/shared/headers/CashierHeader';
import MerchantHeaderA from '../../../components/shared/headers/MerchantHeaderA';
import userGroupsTypes from '../../../constants/users';
import {
  getAuthenticatedUser,
  getUserData,
} from '../../../redux/selectors/accountSelector';
import getUserGroup from '../../../utils/authUtil';
import { getContentHeight } from '../../../utils/window';
import classes from './merchant.module.scss';

const Merchant = () => {
  const data = useSelector(getUserData);
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);

  const isMerchant = userGroup === userGroupsTypes.MERCHANT;

  return (
    <div className={classes.merchantPageWrapper}>
      {isMerchant && <MerchantHeaderA isMerchant={isMerchant} />}
      {!isMerchant && <CashierHeader isMerchant={isMerchant} />}
      <div
        className={classes.merchantAccountContainer}
        style={{ height: getContentHeight() }}
      >
        <div className={classes.titleWrapper}>
          <div className={classes.merchantContainerTitle}>
            {data && data.item && data.item.businessName}
          </div>
          <div className={classes.followerCountWrapper}>
            <FavoriteOutlinedIcon className={classes.favoriteIcon} />
            {data && data.item && data.item.stat_patron}
          </div>
        </div>
      </div>
      <MerchantFooter />
    </div>
  );
};

export default Merchant;
