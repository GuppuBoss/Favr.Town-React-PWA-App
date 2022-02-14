import PropTypes from 'prop-types';
import React from 'react';

import UploadIcon from '../../../assets/images/icons/icon_upload.svg';
import StandardIcon from '../customIcons/StandardIcon';
import classes from './footer.module.scss';
import FooterButton from './FooterButton';

const AddMerchantFooter = ({ onSubmit }) => {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.singleFooterButtonWrapper}>
        <FooterButton onClick={onSubmit}>
          <StandardIcon alt="signOut" src={UploadIcon} />
        </FooterButton>
      </div>
    </div>
  );
};

AddMerchantFooter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddMerchantFooter;
