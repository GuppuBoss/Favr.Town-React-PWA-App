import React from 'react';
import { useSelector } from 'react-redux';

import PatronFooter from '../../../components/shared/footers/PatronFooter';
import PartonHeaderB from '../../../components/shared/headers/PartonHeaderB';
import { getUserData } from '../../../redux/selectors/accountSelector';
import { getContentHeight } from '../../../utils/window';
import ContentList from './ContentList';
import classes from './merchantList.module.scss';

const Merchants = () => {
  const userData = useSelector(getUserData);

  return (
    <div className={classes.merchantsListPageWrapper}>
      <PartonHeaderB />
      <div
        className={classes.merchantsListContainer}
        id="scrollableDiv"
        style={{ height: getContentHeight() }}
      >
        <ContentList />
      </div>
      <PatronFooter isMerchantViewDisabled newFlags={userData?.flags} />
    </div>
  );
};

export default Merchants;
