import PropTypes from 'prop-types';
import React from 'react';

import classes from '../../components/shared/footers/footer.module.scss';

const SignInPageFooter = (props) => {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.footerButtonsWrapper}>
        <button
          className={classes.normalButtonWrapper}
          disabled={props.isDisabledJoin}
          form="sigin_form_id"
          onClick={props.handleJoinButton}
          type="button"
        >
          JOIN
        </button>
        <button
          className={classes.normalButtonWrapper}
          disabled={props.isDisabledSignIn}
          form="sigin_form_id"
          type="submit"
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default SignInPageFooter;

SignInPageFooter.propTypes = {
  isDisabledJoin: PropTypes.bool.isRequired,
  handleJoinButton: PropTypes.func.isRequired,
  isDisabledSignIn: PropTypes.bool.isRequired,
};
