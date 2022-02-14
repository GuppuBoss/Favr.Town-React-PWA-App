import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo/logo_with_name.svg';
import classes from './header.module.scss';

const NeutralHeader = () => {
  return (
    <div className={classes.headerWrapper}>
      <div className={classes.profileContainer}>
        <div>
          <Link to="/">
            <img alt="profile" className={classes.neutralLogo} src={logo} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NeutralHeader;
