import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../../assets/images/logo/logo_with_name.svg';
import ROUTES from '../../../constants/routes';
import { getUserData } from '../../../redux/selectors/accountSelector';
import SupportModal from '../modals/SupportModal';
import classes from './header.module.scss';

const MerchantHeaderB = () => {
  const navigate = useNavigate();
  const { history } = window;
  const data = useSelector(getUserData);

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const handleCloseIconClick = () => {
    if (history.length === 1) {
      navigate(ROUTES.HOME);
    } else {
      navigate(-1);
    }
  };

  const handleLogoClick = () => {
    navigate(ROUTES.HOME);
  };

  const handleSupportModalClose = () => {
    setIsSupportModalOpen(false);
  };
  const handleSupportModalOpen = () => {
    setIsSupportModalOpen(true);
  };

  const hasLogo = data && data.item && data.item.logo;

  return (
    <div className={classes.headerWrapper}>
      <div className={classes.profileContainer}>
        <div>
          <img
            alt="profile"
            className={classes.profileImage}
            onClick={handleLogoClick}
            src={hasLogo ? data.item.logo : logo}
          />
        </div>
        <div className={classes.helpIconWrapper}>
          <HelpOutlineOutlinedIcon onClick={handleSupportModalOpen} />
        </div>
      </div>
      <div className={classes.sideNavContainer}>
        <CloseIcon
          className={classes.rightSideIcon}
          onClick={handleCloseIconClick}
        />
        <Link to="/">favr.town</Link>
      </div>
      <SupportModal
        handleClose={handleSupportModalClose}
        isOpen={isSupportModalOpen}
      />
    </div>
  );
};

export default MerchantHeaderB;
