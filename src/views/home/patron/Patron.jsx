import React from 'react';
import { useSelector } from 'react-redux';

import PatronFooter from '../../../components/shared/footers/PatronFooter';
import PartonHeaderA from '../../../components/shared/headers/PartonHeaderA';
import { getUserData } from '../../../redux/selectors/accountSelector';
import { getContentHeight } from '../../../utils/window';
import classes from './patron.module.scss';
import PatronBody from './PatronBody';

const Patron = () => {
  const userData = useSelector(getUserData);

  return (
    <div className={classes.patronPageWrapper}>
      <PartonHeaderA />
      <div
        className={classes.patronContainer}
        style={{ height: getContentHeight() }}
      >
        <PatronBody />
      </div>
      <PatronFooter newFlags={userData?.flags} />
    </div>
  );
};

export default Patron;
