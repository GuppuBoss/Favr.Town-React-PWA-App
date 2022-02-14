import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import FollowIcon from '../../../assets/images/icons/icon_follow.svg';
import patronIcon from '../../../assets/images/icons/icon_patron.svg';
import qrIcon from '../../../assets/images/icons/icon_qr.svg';
import TrashIcon from '../../../assets/images/icons/icon_trash.svg';
import ROUTES from '../../../constants/routes';
import StandardIcon from '../customIcons/StandardIcon';
import classes from './footer.module.scss';
import FooterButton from './FooterButton';

const NewsDetailFooter = ({
  handleLikeUnlike,
  isPatron,
  pk,
  sk,
  isMerchant,
  isLikeDisabled,
  isUnLikeDisabled,
}) => {
  const navigate = useNavigate();
  return (
    <div className={classes.footerContainer}>
      <div className={classes.doubleFooterButtonWrapper}>
        {(isMerchant || isPatron) && (
          <FooterButton
            isDisabled={isLikeDisabled && isUnLikeDisabled}
            onClick={() => handleLikeUnlike({ pk, sk })}
          >
            {!isPatron && <StandardIcon alt="follow" src={TrashIcon} />}
            {isPatron && <StandardIcon alt="follow" src={FollowIcon} />}
          </FooterButton>
        )}
        {!isMerchant && !isPatron && (
          <>
            <FooterButton onClick={() => navigate(ROUTES.PATRONS)}>
              <StandardIcon alt="follow" src={patronIcon} />
            </FooterButton>
            <FooterButton onClick={() => navigate(ROUTES.QR)}>
              <StandardIcon alt="share" src={qrIcon} />
            </FooterButton>
          </>
        )}
      </div>
    </div>
  );
};

NewsDetailFooter.propTypes = {
  handleLikeUnlike: PropTypes.func.isRequired,
  isLikeDisabled: PropTypes.bool.isRequired,
  isUnLikeDisabled: PropTypes.bool.isRequired,
  isPatron: PropTypes.bool.isRequired,
  isMerchant: PropTypes.bool.isRequired,
  pk: PropTypes.string.isRequired,
  sk: PropTypes.string.isRequired,
};

export default NewsDetailFooter;
