import { Grid } from '@mui/material';
// import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import InfiniteScrollWrapper from '../../../components/shared/display/InfiniteScrollWrapper';
import notificationType from '../../../constants/notification';
import { getFollowingMerchantsList } from '../../../redux/actions/patronActions';
import useNetwork from '../../../utils/useNetwork';
import BusinessCard from './BusinessCard';
import classes from './merchantList.module.scss';
import SkeletonCard from './SkeletonCard';

const ContentList = () => {
  const dispatch = useDispatch();
  const isOnline = useNetwork();
  const [isLoading, setIsLoading] = useState(false);
  const [merchantsList, setMerchantsList] = useState({});

  const fetchMerchantsList = async (payload) => {
    setIsLoading(true);
    try {
      const result = await dispatch(
        getFollowingMerchantsList(dispatch, payload)
      );
      setMerchantsList(
        merchantsList?.items
          ? {
              LastEvaluatedKey: result.LastEvaluatedKey,
              items: [...merchantsList.items, ...result.items],
            }
          : result
      );
    } catch (error) {
      if (isOnline) {
        toastNotification({
          type: notificationType.ERROR,
          message: 'something went wrong',
        });
      }
    }
    setIsLoading(false);
  };

  useEffect(async () => {
    await fetchMerchantsList({ type: 'following' });
    return () => {};
  }, []);

  return (
    <div className={classes.merchantListBodyWrapper}>
      <Grid container spacing="2">
        <Grid container item={12}>
          {isLoading && !merchantsList?.items?.length && <SkeletonCard />}
          <InfiniteScrollWrapper
            fetchMoreData={() => {
              fetchMerchantsList({
                type: 'following',
                ExclusiveStartKey: merchantsList?.LastEvaluatedKey,
              });
            }}
            hasMore={!!merchantsList?.LastEvaluatedKey}
            length={
              merchantsList?.items?.length ? merchantsList?.items?.length : 0
            }
            // eslint-disable-next-line react-perf/jsx-no-jsx-as-prop
            Loading={<SkeletonCard />}
            scrollableTarget="scrollableDiv"
          >
            {merchantsList?.items &&
              merchantsList?.items.map((business) => {
                return (
                  <BusinessCard
                    key={business.businessName}
                    about={business.about}
                    logo={business.logo}
                    name={business.businessName}
                    rewardPercent={business.reward_percent}
                    tags={business.tags}
                    url={business.url}
                  />
                );
              })}
          </InfiniteScrollWrapper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContentList;
