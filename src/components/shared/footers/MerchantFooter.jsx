import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import actionIcon from '../../../assets/images/icons/icon_action.svg';
import programIcon from '../../../assets/images/icons/icon_logo.svg';
import messageIcon from '../../../assets/images/icons/icon_message.svg';
import newsIcon from '../../../assets/images/icons/icon_news.svg';
import patronIcon from '../../../assets/images/icons/icon_patron.svg';
import qrIcon from '../../../assets/images/icons/icon_qr.svg';
import ROUTES from '../../../constants/routes';
import userGroupsTypes from '../../../constants/users';
import {
  getAuthenticatedUser,
  getUserData,
} from '../../../redux/selectors/accountSelector';
import getUserGroup from '../../../utils/authUtil';
import StandardIcon from '../customIcons/StandardIcon';
import classes from './footer.module.scss';
import FooterButton from './FooterButton';

const MerchantFooter = () => {
  const data = useSelector(getUserData);
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);

  const {
    item: { flags: newFlags },
  } = data;

  const navigate = useNavigate();

  return (
    <div className={classes.footerContainer}>
      <div className={classes.footerButtonWrapper}>
        {userGroup === userGroupsTypes.MERCHANT && (
          <FooterButton onClick={() => navigate(ROUTES.PROGRAM)}>
            <StandardIcon alt="program" src={programIcon} />
          </FooterButton>
        )}
        {userGroup === userGroupsTypes.MERCHANT && (
          <FooterButton onClick={() => navigate(ROUTES.ACTIONS)}>
            {newFlags?.flag_new_action && (
              <span className={classes.redCircle} />
            )}
            <StandardIcon alt="actions" src={actionIcon} />
          </FooterButton>
        )}
        {userGroup === userGroupsTypes.CASHIER && (
          <FooterButton onClick={() => navigate(ROUTES.NEWS)}>
            <StandardIcon alt="actions" src={newsIcon} />
          </FooterButton>
        )}
        {userGroup === userGroupsTypes.MERCHANT && (
          <FooterButton onClick={() => navigate(ROUTES.CONVERSATIONS)}>
            {newFlags?.flag_new_conversation && (
              <span className={classes.redCircle} />
            )}
            <StandardIcon alt="conversations" src={messageIcon} />
          </FooterButton>
        )}
        <FooterButton onClick={() => navigate(ROUTES.PATRONS)}>
          {newFlags?.flag_new_patron && <span className={classes.redCircle} />}
          <StandardIcon alt="patrons" src={patronIcon} />
        </FooterButton>
        <FooterButton onClick={() => navigate(ROUTES.QR)}>
          <StandardIcon alt="qr" src={qrIcon} />
        </FooterButton>
      </div>
    </div>
  );
};

export default MerchantFooter;
