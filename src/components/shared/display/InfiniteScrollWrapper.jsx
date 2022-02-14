/* eslint-disable react/prop-types */
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteScrollWrapper = ({
  length,
  fetchMoreData,
  hasMore,
  children,
  scrollableTarget,
  Loading,
}) => {
  return (
    <InfiniteScroll
      dataLength={length}
      hasMore={hasMore}
      loader={Loading}
      next={fetchMoreData}
      scrollableTarget={scrollableTarget}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollWrapper;
