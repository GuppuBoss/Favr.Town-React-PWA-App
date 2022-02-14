import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import ROUTES from '../../../constants/routes';
import { getUserData } from '../../../redux/selectors/accountSelector';
import SupportModal from '../modals/SupportModal';
import classes from './header.module.scss';

const PartonHeaderA = () => {
  const navigate = useNavigate();
  const data = useSelector(getUserData);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const handleMenuIconClick = () => {
    navigate(ROUTES.ACCOUNT);
  };

  const handleSupportModalClose = () => {
    setIsSupportModalOpen(false);
  };
  const handleSupportModalOpen = () => {
    setIsSupportModalOpen(true);
  };

  return (
    <div className={classes.headerWrapper}>
      <section className={classes.profileContainer}>
        <div>
          {data && data.item && data.item.profilePicture && (
            <img
              alt="profile"
              className={classes.profileImage}
              onClick={() => navigate(ROUTES.HOME)}
              src={data && data.item && data.item.profilePicture}
            />
          )}
        </div>
        <div className={classes.helpIconWrapper}>
          <HelpOutlineOutlinedIcon onClick={handleSupportModalOpen} />
          <div className={classes.requestNumber}>
            {data && data.item && data.item.favr}
          </div>
        </div>
      </section>
      <div className={classes.sideNavContainer}>
        <MenuIcon
          className={classes.rightSideIcon}
          onClick={handleMenuIconClick}
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

export default PartonHeaderA;
