import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import actionIcon from '../../../assets/images/icons/icon_action.svg';
import messageIcon from '../../../assets/images/icons/icon_message.svg';
import newsIcon from '../../../assets/images/icons/icon_news.svg';
import qrIcon from '../../../assets/images/icons/icon_qr.svg';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import classes from '../../../components/shared/footers/footer.module.scss';
import FooterButton from '../../../components/shared/footers/FooterButton';
import ROUTES from '../../../constants/routes';

const PatronDetailFooter = ({ actionUrl, conversationUrl, isMerchant }) => {
  const navigate = useNavigate();
  const handleButtonClick = (url) => {
    if (url) {
      navigate(url);
    }
  };

  return (
    <div className={classes.footerContainer}>
      <div className={classes.footerButtonWrapper}>
        {isMerchant ? (
          <>
            <FooterButton
              isDisabled={!actionUrl}
              onClick={() => handleButtonClick(actionUrl)}
            >
              <StandardIcon alt="action" src={actionIcon} />
            </FooterButton>
            <FooterButton
              isDisabled={!conversationUrl}
              onClick={() => handleButtonClick(conversationUrl)}
            >
              <StandardIcon alt="conversation" src={messageIcon} />
            </FooterButton>
          </>
        ) : (
          <>
            <FooterButton onClick={() => navigate(ROUTES.NEWS)}>
              <StandardIcon alt="news" src={newsIcon} />
            </FooterButton>
            <FooterButton onClick={() => navigate(ROUTES.QR)}>
              <StandardIcon alt="qr" src={qrIcon} />
            </FooterButton>
          </>
        )}
      </div>
    </div>
  );
};

export default PatronDetailFooter;

PatronDetailFooter.propTypes = {
  actionUrl: PropTypes.string,
  conversationUrl: PropTypes.string,
  isMerchant: PropTypes.bool.isRequired,
};

PatronDetailFooter.defaultProps = {
  actionUrl: null,
  conversationUrl: null,
};
