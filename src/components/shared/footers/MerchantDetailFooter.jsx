import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import actionIcon from '../../../assets/images/icons/icon_action.svg';
import messageIcon from '../../../assets/images/icons/icon_message.svg';
import newsIcon from '../../../assets/images/icons/icon_news.svg';
import suggestionIcon from '../../../assets/images/icons/icon_suggestion.jpg';
import surveyIcon from '../../../assets/images/icons/icon_survey.svg';
import StandardIcon from '../customIcons/StandardIcon';
import classes from './footer.module.scss';
import FooterButton from './FooterButton';

const MerchantFooter = (props) => {
  const { merchantDetails } = props;
  const navigate = useNavigate();

  return (
    <div className={classes.footerContainer}>
      <div className={classes.footerButtonWrapper}>
        <FooterButton
          onClick={(e) => {
            e.preventDefault();
            if (merchantDetails?.url_vote) {
              navigate(merchantDetails?.url_vote);
            }
          }}
        >
          <StandardIcon alt="program" src={surveyIcon} />
        </FooterButton>
        <FooterButton
          onClick={() => {
            if (merchantDetails?.url_action) {
              navigate(merchantDetails?.url_action);
            }
          }}
        >
          <StandardIcon alt="actions" src={actionIcon} />
        </FooterButton>
        <FooterButton
          onClick={() => {
            if (merchantDetails?.url_news) {
              navigate(merchantDetails?.url_news);
            }
          }}
        >
          <img alt="patrons" src={newsIcon} />
        </FooterButton>
        <FooterButton
          onClick={() => {
            if (merchantDetails?.url_conversation) {
              navigate(merchantDetails?.url_conversation);
            }
          }}
        >
          <StandardIcon alt="conversations" src={messageIcon} />
        </FooterButton>
        <FooterButton
          onClick={() => {
            if (merchantDetails?.url_suggest) {
              navigate(merchantDetails?.url_suggest);
            }
          }}
        >
          <img alt="qr" src={suggestionIcon} />
        </FooterButton>
      </div>
    </div>
  );
};

export default MerchantFooter;

MerchantFooter.propTypes = {
  merchantDetails: PropTypes.shape({
    url_action: PropTypes.string,
    url_news: PropTypes.string,
    url_conversation: PropTypes.string,
    url_vote: PropTypes.string,
    url_suggest: PropTypes.string,
  }).isRequired,
  flag: PropTypes.shape({
    following: PropTypes.bool,
  }).isRequired,
};
