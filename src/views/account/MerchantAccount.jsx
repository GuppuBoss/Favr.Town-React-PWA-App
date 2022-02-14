import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import StyledCheckIcon from '../../components/shared/customIcons/StyledCheckIcon';
import StyledClearIcon from '../../components/shared/customIcons/StyledClearIcon';
import StyledWarnIcon from '../../components/shared/customIcons/StyledWarnIcon';
import AccountFooter from '../../components/shared/footers/AccountFooter';
import MerchantHeaderB from '../../components/shared/headers/MerchantHeaderB';
import AcknowledgementsModal from '../../components/shared/modals/AcknowledgementsModal';
import AreYouSureModal from '../../components/shared/modals/AreYouSureModal';
import ROUTES from '../../constants/routes';
import { getUserData } from '../../redux/selectors/accountSelector';
import { getContentHeight } from '../../utils/window';
import classes from './account.module.scss';

const MerchantAccount = () => {
  const navigate = useNavigate();
  const data = useSelector(getUserData);
  const [isOpenAreYouSureModal, setIsOpenAreYouSureModal] = useState(false);
  const [isOpenAcknowledgementModal, setIsOpenAcknowledgementModal] =
    useState(false);

  const navigateToPasswordPage = () => {
    navigate(ROUTES.PASSWORD);
  };
  const navigateToEmailPage = () => {
    navigate(ROUTES.EMAIL);
  };

  const navigateToProfile = () => {
    navigate(ROUTES.PROFILE);
  };

  const navigateToLocation = () => {
    navigate(ROUTES.LOCATIONS);
  };
  const handleMerchantAccountClose = () => {
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
    <div className={classes.merchantPageWrapper}>
      <MerchantHeaderB />
      <div
        className={classes.merchantAccountContainer}
        style={{ height: getContentHeight() }}
      >
        <div className={classes.merchantTopButtonWrapper}>
          <button
            className={`${classes.normalButtonWrapper} ${classes.topAndBottomButtons} ${classes.topLeftButton}`}
            onClick={navigateToPasswordPage}
            type="button"
          >
            CHANGE PASSWORD
          </button>
          <div className={classes.topRightButtonWrapper}>
            <button
              className={`${classes.normalButtonWrapper} ${classes.topAndBottomButtons} ${classes.rightButton}`}
              onClick={navigateToEmailPage}
              type="button"
            >
              CHANGE EMAIL
            </button>
          </div>
        </div>
        <div className={classes.merchantMiddleButtonWrapper}>
          <button
            className={`${classes.normalButtonWrapper} ${classes.middleButton} ${classes.middleLeftButton}`}
            onClick={navigateToLocation}
            type="button"
          >
            LOCATIONS
            {data && data.flags && data.flags.flag_profile_complete ? (
              <StyledCheckIcon className={classes.positionFix} />
            ) : (
              <StyledWarnIcon className={classes.positionFix} />
            )}
          </button>
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
        <div className={classes.merchantBottomButtonWrapper}>
          <button
            className={`${classes.normalButtonWrapper} ${classes.topAndBottomButtons} ${classes.rightButton}`}
            onClick={handleMerchantAccountClose}
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

export default MerchantAccount;
