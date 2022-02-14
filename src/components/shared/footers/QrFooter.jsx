import React from 'react';
import { useNavigate } from 'react-router-dom';

import NewsIcon from '../../../assets/images/icons/icon_news.svg';
import PatronIcon from '../../../assets/images/icons/icon_patron.svg';
import ROUTES from '../../../constants/routes';
import StandardIcon from '../customIcons/StandardIcon';
import classes from './footer.module.scss';
import FooterButton from './FooterButton';

const QrFooter = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.footerContainer}>
      <div className={classes.footerButtonWrapper}>
        <FooterButton onClick={() => navigate(ROUTES.NEWS)}>
          <StandardIcon alt="signOut" src={NewsIcon} />
        </FooterButton>
        <FooterButton onClick={() => navigate(ROUTES.PATRONS)}>
          <StandardIcon alt="signOut" src={PatronIcon} />
        </FooterButton>
      </div>
    </div>
  );
};

export default QrFooter;
