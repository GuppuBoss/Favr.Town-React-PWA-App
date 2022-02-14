import PropTypes from 'prop-types';
import React from 'react';

import classes from '../../components/shared/footers/footer.module.scss';

const ConfirmPageFooter = (props) => {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.footerButtonsWrapper}>
        <button
          className={classes.normalButtonWrapper}
          form="confirmForm"
          onClick={props.handleNeCodeRequest}
          type="button"
        >
          NEW CODE
        </button>
        <button
          className={classes.normalButtonWrapper}
          disabled={!props.isDirtyCode}
          form="confirmForm"
          onClick={props.handleCodeConfirm}
          type="button"
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default ConfirmPageFooter;

ConfirmPageFooter.propTypes = {
  handleNeCodeRequest: PropTypes.func.isRequired,
  handleCodeConfirm: PropTypes.func.isRequired,
  isDirtyCode: PropTypes.bool.isRequired,
};
