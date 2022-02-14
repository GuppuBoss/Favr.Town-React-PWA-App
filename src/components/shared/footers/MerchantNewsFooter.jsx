import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import newCouponIcon from '../../../assets/images/icons/icon_coupon_new.svg';
import newNewsIcon from '../../../assets/images/icons/icon_news_new.svg';
import patronIcon from '../../../assets/images/icons/icon_patron.svg';
import qrIcon from '../../../assets/images/icons/icon_qr.svg';
import ROUTES from '../../../constants/routes';
import StandardIcon from '../customIcons/StandardIcon';
import classes from './footer.module.scss';
import FooterButton from './FooterButton';

const MerchantNewFooter = ({ onNewNewsClick, onNewCouponClick, isCashier }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.footerContainer}>
      <div className={classes.doubleFooterButtonWrapper}>
        {!isCashier && (
          <FooterButton onClick={onNewNewsClick}>
            <StandardIcon alt="news" isAddButton src={newNewsIcon} />
          </FooterButton>
        )}

        {isCashier && (
          <FooterButton onClick={() => navigate(ROUTES.PATRONS)}>
            <StandardIcon alt="patron" src={patronIcon} />
          </FooterButton>
        )}
        {!isCashier && (
          <FooterButton onClick={onNewCouponClick}>
            <StandardIcon alt="coupon" isAddButton src={newCouponIcon} />
          </FooterButton>
        )}
        {isCashier && (
          <FooterButton onClick={() => navigate(ROUTES.QR)}>
            <StandardIcon alt="qr" src={qrIcon} />
          </FooterButton>
        )}
      </div>
    </div>
  );
};

MerchantNewFooter.propTypes = {
  isCashier: PropTypes.bool.isRequired,
  onNewNewsClick: PropTypes.func.isRequired,
  onNewCouponClick: PropTypes.func.isRequired,
};

export default MerchantNewFooter;
