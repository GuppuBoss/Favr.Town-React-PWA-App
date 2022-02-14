import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import actionIcon from '../../../assets/images/icons/icon_action.svg';
import programIcon from '../../../assets/images/icons/icon_logo.svg';
import messageIcon from '../../../assets/images/icons/icon_message.svg';
import newMessageIcon from '../../../assets/images/icons/icon_message_new.svg';
import newsIcon from '../../../assets/images/icons/icon_news.svg';
import qrIcon from '../../../assets/images/icons/icon_qr.svg';
import ROUTES from '../../../constants/routes';
import StandardIcon from '../customIcons/StandardIcon';
import classes from './footer.module.scss';
import FooterButton from './FooterButton';

const PatronFooter = (props) => {
  const navigate = useNavigate();
  const { newFlags } = props;

  return (
    <div className={classes.footerContainer}>
      <div className={classes.footerButtonWrapper}>
        <FooterButton
          isDisabled={props.isMerchantViewDisabled}
          onClick={() => navigate(ROUTES.MERCHANTS)}
        >
          <StandardIcon alt="program" src={programIcon} />
        </FooterButton>
        <FooterButton
          isDisabled={props.isActionDisabled}
          onClick={() => navigate(ROUTES.ACTIONS)}
        >
          {newFlags?.flag_new_action && <span className={classes.redCircle} />}
          <StandardIcon alt="actions" src={actionIcon} />
        </FooterButton>
        <FooterButton
          isDisabled={props.isNewsDisabled}
          onClick={() => navigate(ROUTES.NEWS)}
        >
          {newFlags?.flag_new_patron && <span className={classes.redCircle} />}
          <StandardIcon alt="patrons" src={newsIcon} />
        </FooterButton>
        <FooterButton
          isDisabled={props.handleNewConversation && !newFlags?.flag_allow_new}
          onClick={() =>
            props.handleNewConversation
              ? props.handleNewConversation()
              : navigate(ROUTES.CONVERSATIONS)
          }
        >
          {newFlags?.flag_new_patron && <span className={classes.redCircle} />}
          <StandardIcon
            alt="patrons"
            isAddButton
            src={
              props.handleNewConversation && newFlags?.flag_allow_new
                ? newMessageIcon
                : messageIcon
            }
          />
        </FooterButton>
        <FooterButton onClick={() => navigate(ROUTES.QR)}>
          <StandardIcon alt="qr" src={qrIcon} />
        </FooterButton>
      </div>
    </div>
  );
};

export default PatronFooter;

PatronFooter.propTypes = {
  newFlags: PropTypes.shape({
    flag_new_action: PropTypes.bool,
    flag_new_conversation: PropTypes.bool,
    flag_new_patron: PropTypes.bool,
    flag_allow_new: PropTypes.bool,
  }).isRequired,
  isActionDisabled: PropTypes.bool.isRequired,
  isNewsDisabled: PropTypes.bool.isRequired,
  handleNewConversation: PropTypes.func.isRequired,
  isMerchantViewDisabled: PropTypes.bool.isRequired,
};
