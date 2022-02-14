import React from 'react';

import PatronFooter from '../../../components/shared/footers/PatronFooter';
import PartonHeaderB from '../../../components/shared/headers/PartonHeaderB';
import { getContentHeight } from '../../../utils/window';
import CouponList from './CouponList';
import classes from './coupons.module.scss';

const Search = () => {
  return (
    <div className={classes.merchantsListPageWrapper}>
      <PartonHeaderB />
      <div
        className={classes.merchantsListContainer}
        id="scrollableDiv"
        style={{ height: getContentHeight() }}
      >
        <CouponList />
      </div>
      <PatronFooter />
    </div>
  );
};

export default Search;
