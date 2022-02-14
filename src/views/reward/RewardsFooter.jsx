import PropTypes from 'prop-types';
import React from 'react';

import classes from '../../components/shared/footers/footer.module.scss';

const RewardsFooter = ({ isAllowAdd, handleAddRewardModalOpen }) => {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.singleFooterButtonWrapper}>
        {isAllowAdd ? (
          <button
            className={classes.normalButtonWrapper}
            onClick={handleAddRewardModalOpen}
            type="button"
          >
            ADD
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default RewardsFooter;

RewardsFooter.propTypes = {
  isAllowAdd: PropTypes.bool,
  handleAddRewardModalOpen: PropTypes.func,
};

RewardsFooter.defaultProps = {
  isAllowAdd: false,
  handleAddRewardModalOpen: null,
};
