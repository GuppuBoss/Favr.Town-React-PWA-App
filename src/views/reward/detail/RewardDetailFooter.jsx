import PropTypes from 'prop-types';
import React from 'react';

import trashIcon from '../../../assets/images/icons/icon_trash.svg';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import classes from '../../../components/shared/footers/footer.module.scss';
import FooterButton from '../../../components/shared/footers/FooterButton';

const RewardDetailFooter = ({ handleRewardDelete }) => {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.doubleFooterButtonWrapper}>
        <FooterButton onClick={handleRewardDelete}>
          <StandardIcon alt="delete" src={trashIcon} />
        </FooterButton>
      </div>
    </div>
  );
};

export default RewardDetailFooter;

RewardDetailFooter.propTypes = {
  handleRewardDelete: PropTypes.func.isRequired,
};
