import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import StyledCheckIcon from '../../components/shared/customIcons/StyledCheckIcon';
import StyledClearIcon from '../../components/shared/customIcons/StyledClearIcon';
import AccountFooter from '../../components/shared/footers/AccountFooter';
import PartonHeaderB from '../../components/shared/headers/PartonHeaderB';
import AcknowledgementsModal from '../../components/shared/modals/AcknowledgementsModal';
import AreYouSureModal from '../../components/shared/modals/AreYouSureModal';
import { getUserData } from '../../redux/selectors/accountSelector';
import { getContentHeight } from '../../utils/window';
import classes from './account.module.scss';

const PatronAccount = () => {
  const navigate = useNavigate();
  const data = useSelector(getUserData);

  const [isOpenAreYouSureModal, setIsOpenAreYouSureModal] = useState(false);
  const [isOpenAcknowledgementModal, setIsOpenAcknowledgementModal] =
    useState(false);

  const navigateToPasswordPage = () => {
    navigate('/password');
  };
  const navigateToEmailPage = () => {
    navigate('/email');
  };

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const handlePatronAccountClose = () => {
    setIsOpenAreYouSureModal(true);
  };
  const handleAreYouSureModalClose = () => {
    setIsOpenAreYouSureModal(false);
  };
  const handleAcknowledgementModalOpen = () => {
    setIsOpenAcknowledgementModal(true);
  };
  const handleAcknowledgementModalClose = () => {
    setIsOpenAcknowledgementModal(false);
  };

  return (
    <div className={classes.patronPageWrapper}>
      <PartonHeaderB />
      <div
        className={classes.patronAccountContainer}
        style={{ height: getContentHeight() }}
      >
        <div className={classes.patronTopButtonWrapper}>
          <button
            className={`${classes.normalButtonWrapper} ${classes.topAndBottomButtons} ${classes.topLeftButton}`}
            onClick={navigateToPasswordPage}
            type="button"
          >
            CHANGE PASSWORD
          </button>
          <div className={classes.topRightButtonWrapper}>
            <button
              className={`${classes.normalButtonWrapper} ${classes.topAndBottomButtons}  ${classes.rightButton}`}
              onClick={navigateToEmailPage}
              type="button"
            >
              CHANGE EMAIL
            </button>
          </div>
        </div>
        <div className={classes.patronMiddleButtonWrapper}>
          <button
            className={`${classes.normalButtonWrapper} ${classes.middleButton} ${classes.middleRightButton}`}
            onClick={navigateToProfile}
            type="button"
          >
            PROFILE
            {data && data.flags && data.flags.flag_profile_complete ? (
              <StyledCheckIcon className={classes.positionFix} />
            ) : (
              <StyledClearIcon className={classes.positionFix} />
            )}
          </button>
        </div>
        <div className={classes.patronBottomButtonWrapper}>
          <button
            className={`${classes.normalButtonWrapper} ${classes.topAndBottomButtons}  ${classes.rightButton}`}
            onClick={handlePatronAccountClose}
            type="button"
          >
            CLOSE ACCOUNT
          </button>
        </div>
      </div>
      <AccountFooter
        handleAcknowledgementModalOpen={handleAcknowledgementModalOpen}
      />
      <AreYouSureModal
        handleClose={handleAreYouSureModalClose}
        isOpen={isOpenAreYouSureModal}
      />
      <AcknowledgementsModal
        handleClose={handleAcknowledgementModalClose}
        isOpen={isOpenAcknowledgementModal}
      />
    </div>
  );
};

export default PatronAccount;
