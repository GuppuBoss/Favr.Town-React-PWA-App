import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import signOutIcon from '../../../assets/images/icons/signOutIcon.svg';
import logo from '../../../assets/images/logo/logo_with_name.svg';
import notificationType from '../../../constants/notification';
import ROUTES from '../../../constants/routes';
import { signOutUser } from '../../../redux/actions/accountActions';
import { getUserData } from '../../../redux/selectors/accountSelector';
import toastNotification from '../alerts/toastNotification';
import SupportModal from '../modals/SupportModal';
import classes from './header.module.scss';

const CashierHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(getUserData);

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const logOut = async () => {
    try {
      await dispatch(signOutUser(dispatch));
      navigate(ROUTES.SIGN_IN);
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSupportModalClose = () => {
    setIsSupportModalOpen(false);
  };
  const handleSupportModalOpen = () => {
    setIsSupportModalOpen(true);
  };

  const hasProfilePic = data && data.item && data.item.logo;

  return (
    <div className={classes.headerWrapper}>
      <div className={classes.profileContainer}>
        <div>
          <img
            alt="profile"
            className={classes.profileImage}
            onClick={handleLogoClick}
            src={hasProfilePic ? data.item.logo : logo}
          />
        </div>
        <div className={classes.helpIconWrapper}>
          <HelpOutlineOutlinedIcon onClick={handleSupportModalOpen} />
        </div>
      </div>
      <div className={classes.sideNavContainer}>
        <img
          alt="sign-out"
          className={classes.rightSideIcon}
          onClick={logOut}
          src={signOutIcon}
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

export default CashierHeader;
