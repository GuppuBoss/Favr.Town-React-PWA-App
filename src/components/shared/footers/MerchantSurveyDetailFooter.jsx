import PropTypes from 'prop-types';
import React from 'react';

import ShareIcon from '../../../assets/images/icons/icon_share.svg';
import StandardIcon from '../customIcons/StandardIcon';
import TrashIcon from '../customIcons/TrashIcon';
import classes from './footer.module.scss';
import FooterButton from './FooterButton';

const MerchantSurveyDetailFooter = ({ onDelete, handleShare, pk, sk }) => {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.doubleFooterButtonWrapper}>
        <FooterButton onClick={onDelete}>
          <TrashIcon />
        </FooterButton>
        <FooterButton onClick={() => handleShare({ pk, sk })}>
          <StandardIcon alt="actions" src={ShareIcon} />
        </FooterButton>
      </div>
    </div>
  );
};

MerchantSurveyDetailFooter.propTypes = {
  onDelete: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  pk: PropTypes.func.isRequired,
  sk: PropTypes.func.isRequired,
};

export default MerchantSurveyDetailFooter;
