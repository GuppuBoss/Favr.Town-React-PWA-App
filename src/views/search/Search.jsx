import React from 'react';

import PatronFooter from '../../components/shared/footers/PatronFooter';
import PartonHeaderB from '../../components/shared/headers/PartonHeaderB';
import { getContentHeight } from '../../utils/window';
import classes from './search.module.scss';
import SearchBody from './SearchBody';

const Search = () => {
  return (
    <div className={classes.searchPageWrapper}>
      <PartonHeaderB />
      <div
        className={classes.searchContainer}
        id="scrollableDiv"
        style={{ height: getContentHeight() }}
      >
        <SearchBody />
      </div>
      <PatronFooter />
    </div>
  );
};

export default Search;
