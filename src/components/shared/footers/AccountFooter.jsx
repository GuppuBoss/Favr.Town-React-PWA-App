// import IconButton from '@material-ui/core/IconButton';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import ForumIcon from '@material-ui/icons/Forum';
// import MenuBookIcon from '@material-ui/icons/MenuBook';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import signOutIcon from '../../../assets/images/icons/icon_signout.svg';
import notificationType from '../../../constants/notification';
import ROUTES from '../../../constants/routes';
// import ROUTES from '../../../constants/routes';
import { signOutUser } from '../../../redux/actions/accountActions';
import toastNotification from '../alerts/toastNotification';
import StandardIcon from '../customIcons/StandardIcon';
import SupportModal from '../modals/SupportModal';
import classes from './footer.module.scss';
import FooterButton from './FooterButton';

const AccountFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // const navigateToTerms = () => {
  //   history.push(ROUTES.TERMS);
  // };
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
  const handleSupportModalClose = () => {
    setIsOpen(false);
  };
  // const handleSupportModalOpen = () => {
  //   setIsOpen(true);
  // };

  return (
    <div className={classes.accountFooterContainer}>
      <div className={classes.accountFooterButtonWrapper}>
        {/* <IconButton
          aria-label="terms"
          className={classes.iconButton}
          component="span"
          onClick={navigateToTerms}
        >
          <MenuBookIcon fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="support"
          className={classes.iconButton}
          component="span"
          fontSize="large"
          onClick={handleSupportModalOpen}
        >
          <ForumIcon fontSize="large" />
        </IconButton> */}
        <FooterButton onClick={logOut}>
          <StandardIcon alt="signOut" src={signOutIcon} />
        </FooterButton>
      </div>
      <div className={classes.privacyStatementWrapper}>
        <p>(c) 2021, favr.town. </p>
        <p>
          <Link to="/terms">&nbsp; terms</Link> ,
        </p>
        <p>
          <Link to="/privacy">&nbsp; privacy</Link> ,
        </p>
        &nbsp;
        <p className={classes.acknowledgementWrapper}>
          <Link to="/acknowledgements">acknowledgements</Link>
        </p>
      </div>
      <SupportModal handleClose={handleSupportModalClose} isOpen={isOpen} />
    </div>
  );
};

export default AccountFooter;
