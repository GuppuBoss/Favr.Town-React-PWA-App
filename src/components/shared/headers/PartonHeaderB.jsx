import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { defaultProfilePic } from '../../../constants/default';
import ROUTES from '../../../constants/routes';
import { getUserData } from '../../../redux/selectors/accountSelector';
import SupportModal from '../modals/SupportModal';
import classes from './header.module.scss';

const PartonHeaderB = () => {
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

  const handleSupportModalClose = () => {
    setIsSupportModalOpen(false);
  };
  const handleSupportModalOpen = () => {
    setIsSupportModalOpen(true);
  };

  const hasProfilePic = data && data.item && data.item.profilePicture;

  return (
    <div className={classes.headerWrapper}>
      <div className={classes.profileContainer}>
        <div>
          <img
            alt="profile"
            className={classes.profileImage}
            onClick={() => navigate(ROUTES.HOME)}
            src={hasProfilePic ? data.item.profilePicture : defaultProfilePic}
          />
        </div>
        <div className={classes.helpIconWrapper}>
          <HelpOutlineOutlinedIcon onClick={handleSupportModalOpen} />
          <div className={classes.requestNumber}>
            {data && data.item && data.item.favr}
          </div>
        </div>
      </div>
      <div className={classes.sideNavContainer}>
        <CloseIcon
          className={classes.rightSideIcon}
          onClick={handleCloseIconClick}
        />
        <Link to="/">
          <div>favr.town</div>
        </Link>
      </div>
      <SupportModal
        handleClose={handleSupportModalClose}
        isOpen={isSupportModalOpen}
      />
    </div>
  );
};

export default PartonHeaderB;
