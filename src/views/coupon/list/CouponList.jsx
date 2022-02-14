import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import InfiniteScrollWrapper from '../../../components/shared/display/InfiniteScrollWrapper';
import NoData from '../../../components/shared/display/NoData';
import notificationType from '../../../constants/notification';
import {
  deleteCoupon,
  getCouponList,
  shareAction,
} from '../../../redux/actions/patronActions';
import { saveToClipBoard } from '../../../utils/clipboard';
import useNetwork from '../../../utils/useNetwork';
import CouponCard from './CouponCard';
import classes from './coupons.module.scss';
import SkeletonCard from './SkeletonCard';

const CouponList = () => {
  const dispatch = useDispatch();
  const isOnline = useNetwork();
  const [isLoading, setIsLoading] = useState(false);
  const [couponsList, setCouponsList] = useState({});

  const fetchCouponsList = async (payload) => {
    setIsLoading(true);
    try {
      const result = await dispatch(getCouponList(dispatch, payload));
      const couponsData = couponsList.items
        ? {
            ...couponsList,
            LastEvaluatedKey: result.LastEvaluatedKey,
            items: [...couponsList.items, ...result.items],
          }
        : {
            ...couponsList,
            LastEvaluatedKey: result.LastEvaluatedKey,
            items: [...result.items],
          };
      setCouponsList(couponsData);
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
    await fetchCouponsList();
    return () => {};
  }, []);

  const shareActionFunction = async (pk, sk) => {
    const result = await dispatch(
      shareAction(
        dispatch,
        {
          share: {
            pk,
            sk,
          },
        },
        true
      )
    );

    if (result?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: result.error,
      });
    }

    if (!result?.error) {
      await saveToClipBoard(result?.item?.url);

      toastNotification({
        type: notificationType.SUCCESS,
        message: 'URL COPIED',
      });
    }
  };

  const deleteActionFunction = async (id) => {
    const result = await dispatch(
      deleteCoupon(
        dispatch,
        {
          id,
        },
        true
      )
    );
    setCouponsList(result);

    if (result?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: result.error,
      });
    }
  };

  return (
    <div className={classes.merchantListBodyWrapper}>
      <Grid container justifyContent="center" spacing="2">
        {isLoading && !couponsList?.items?.length && (
          <Grid item sm={12} xs={12}>
            <SkeletonCard />
          </Grid>
        )}
        <div>
          {!isLoading && couponsList?.items?.length === 0 && <NoData />}
          <Grid container item={12}>
            <InfiniteScrollWrapper
              fetchMoreData={() => {
                fetchCouponsList();
              }}
              hasMore={false}
              length={
                couponsList?.items?.length ? couponsList?.items?.length : 0
              }
              // eslint-disable-next-line react-perf/jsx-no-jsx-as-prop
              Loading={<SkeletonCard />}
              scrollableTarget="scrollableDiv"
            >
              {couponsList?.items &&
                couponsList?.items.map((coupon) => {
                  return (
                    <CouponCard
                      key={coupon.pk}
                      coupon={coupon}
                      deleteAction={deleteActionFunction}
                      shareAction={shareActionFunction}
                    />
                  );
                })}
            </InfiniteScrollWrapper>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default CouponList;
