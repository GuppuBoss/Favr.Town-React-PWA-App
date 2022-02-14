import React from 'react';
import { useNavigate } from 'react-router-dom';

import newsIcon from '../../../assets/images/icons/icon_news.svg';
import qrIcon from '../../../assets/images/icons/icon_qr.svg';
import ROUTES from '../../../constants/routes';
import StandardIcon from '../customIcons/StandardIcon';
import classes from './footer.module.scss';
import FooterButton from './FooterButton';

const PatronsFooter = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.footerContainer}>
      <div className={classes.footerButtonWrapper}>
        <FooterButton onClick={() => navigate(ROUTES.NEWS)}>
          <StandardIcon alt="qr" src={newsIcon} />
        </FooterButton>
        <FooterButton onClick={() => navigate(ROUTES.QR)}>
          <StandardIcon alt="qr" src={qrIcon} />
        </FooterButton>
      </div>
    </div>
  );
};

export default PatronsFooter;
