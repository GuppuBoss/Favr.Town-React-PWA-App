import PropTypes from 'prop-types';
import React from 'react';

import suggestionIcon from '../../../assets/images/icons/icon_suggestion.jpg';
import StandardIcon from '../customIcons/StandardIcon';
import classes from './footer.module.scss';
import FooterButton from './FooterButton';

const SuggestionFooter = ({ isDisabled, onClick }) => {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.singleFooterButtonWrapper}>
        <FooterButton isDisabled={isDisabled} onClick={onClick}>
          <StandardIcon alt="qr" src={suggestionIcon} />
        </FooterButton>
      </div>
    </div>
  );
};

SuggestionFooter.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SuggestionFooter;
