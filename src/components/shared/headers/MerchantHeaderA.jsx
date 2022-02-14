import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../../assets/images/logo/logo_with_name.svg';
import ROUTES from '../../../constants/routes';
import { getUserData } from '../../../redux/selectors/accountSelector';
import SupportModal from '../modals/SupportModal';
import classes from './header.module.scss';

const MerchantHeaderA = ({ isMerchant }) => {
  const data = useSelector(getUserData);

  const navigate = useNavigate();
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const handleMenuIconClick = () => {
    navigate(ROUTES.ACCOUNT);
  };

  const handleLogoClick = () => {
    if (isMerchant) {
      navigate(ROUTES.HOME);
    } else navigate(ROUTES.HOME);
  };
  const handleSupportModalClose = () => {
    setIsSupportModalOpen(false);
  };
  const handleSupportModalOpen = () => {
    setIsSupportModalOpen(true);
  };

  return (
    <div className={classes.headerWrapper}>
      <div className={classes.profileContainer}>
        <div>
          <img
            alt="profile"
            className={classes.profileImage}
            onClick={handleLogoClick}
            src={data?.item?.logo || logo}
          />
        </div>
        <div className={classes.helpIconWrapper}>
          <HelpOutlineOutlinedIcon onClick={handleSupportModalOpen} />
        </div>
      </div>
      <div className={classes.sideNavContainer}>
        <MenuIcon
          className={classes.rightSideIcon}
          onClick={handleMenuIconClick}
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
MerchantHeaderA.propTypes = {
  isMerchant: PropTypes.bool.isRequired,
};

export default MerchantHeaderA;
