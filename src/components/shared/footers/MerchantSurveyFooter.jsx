import PropTypes from 'prop-types';
import React from 'react';

import ActionIcon from '../../../assets/images/icons/icon_action.svg';
import StandardIcon from '../customIcons/StandardIcon';
import classes from './footer.module.scss';
import FooterButton from './FooterButton';

const AddMerchantFooter = ({ onClick }) => {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.singleFooterButtonWrapper}>
        <FooterButton onClick={onClick}>
          <StandardIcon alt="signOut" src={ActionIcon} />
        </FooterButton>
      </div>
    </div>
  );
};

AddMerchantFooter.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddMerchantFooter;
