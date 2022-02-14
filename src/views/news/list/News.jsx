/* eslint-disable react/jsx-max-depth */
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import BannerContainer from '../../../components/shared/containers/BannerContainer';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import InfiniteScrollWrapper from '../../../components/shared/display/InfiniteScrollWrapper';
import NoData from '../../../components/shared/display/NoData';
import MerchantNewFooter from '../../../components/shared/footers/MerchantNewsFooter';
import PatronFooter from '../../../components/shared/footers/PatronFooter';
import MerchantHeaderB from '../../../components/shared/headers/MerchantHeaderB';
import PartonHeaderB from '../../../components/shared/headers/PartonHeaderB';
import GenericModal from '../../../components/shared/modals/GenericModal';
import notificationType from '../../../constants/notification';
import userGroupsTypes from '../../../constants/users';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { getAuthenticatedUser } from '../../../redux/selectors/accountSelector';
import { DELETE, PATCH, POST, PUT } from '../../../services/api';
import getUserGroup from '../../../utils/authUtil';
import { saveToClipBoard } from '../../../utils/clipboard';
import useNetwork from '../../../utils/useNetwork';
import CreateNewsModalBody from './CreateNewsModal';
import MerchantNews from './MerchantNews';
import classes from './news.module.scss';
import PatronNews from './PatronNews';
import SkeletonLoading from './SkeletonLoading';

const News = () => {
  const dispatch = useDispatch();
  const isOnline = useNetwork();
  const location = useLocation();
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createType, setCreateType] = useState('');
  const [news, setNews] = useState({});
  const userGroup = getUserGroup(authenticatedUser);

  const queryParam = Object.fromEntries(new URLSearchParams(location.search));
  const isPatron = userGroup === userGroupsTypes.PATRON;

  const isMerchant = userGroup === userGroupsTypes.MERCHANT;

  const isCashier = userGroup === userGroupsTypes.CASHIER;

  const isCoupon = createType === 'coupon';
  const fetchNews = async (payload) => {
    setIsLoading(true);
    try {
      if (payload?.ExclusiveStartKey) {
        const data = await POST('news', { ...payload });

        setNews({
          LastEvaluatedKey: data.LastEvaluatedKey,
          items: [...news.items, ...data.items],
        });
      }
      if (!payload?.ExclusiveStartKey) {
        const data = await POST('news', { ...payload });

        setNews(data);
      }
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

  const handleFetchMore = async (payload) => {
    await fetchNews(payload);
  };

  const onDelete = async ({ sk, index }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, DELETE, 'news', { sk })
    );

    if (!response.error) {
      news?.items.splice(index, 1);
      const updatedNews = { ...news };
      setNews(updatedNews);

      toastNotification({
        type: notificationType.SUCCESS,
        message: response.message,
      });
    }

    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }
  };

  const onNewNewsClick = () => {
    setCreateType('news');
    setIsModalOpen(true);
  };
  const onNewCouponClick = () => {
    setCreateType('coupon');
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setCreateType('');
    setIsModalOpen(false);
  };
  const onShare = async ({ pk, sk, index }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'action', { share: { pk, sk } })
    );
    // const response = await PUT('action', { share: { pk, sk } });
    await saveToClipBoard(response?.item?.url);

    if (!response.error) {
      const updatedNews = { ...news };
      updatedNews.items[index].stat_share = response.item.stat_share;
      setNews(updatedNews);

      await saveToClipBoard(response.item.url);
      toastNotification({
        type: notificationType.SUCCESS,
        message: 'URL copied',
      });
    }

    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }
  };
  const onLike = async ({ pk, sk, index }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'action', { like: { pk, sk } })
    );
    // const response = await PUT('action', { share: { pk, sk } });
    await saveToClipBoard(response?.item?.url);

    if (!response.error) {
      const updatedNews = { ...news };
      updatedNews.items[index].stat_like = response.item.stat_like;
      setNews(updatedNews);

      toastNotification({
        type: notificationType.SUCCESS,
        message: 'Liked',
      });
    }

    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }
  };
  const onCouponClick = async ({ pk, sk, index }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'news', { pk, sk })
    );

    if (!response.error) {
      toastNotification({
        type: notificationType.SUCCESS,
        message: response.message,
      });

      const updatedNews = { ...news };
      updatedNews.items[index] = response.item;
      setNews(updatedNews);
    }

    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }
  };
  useEffect(async () => {
    await fetchNews(queryParam);
    return () => {};
  }, []);

  const handleCreateNews = async (payload, type) => {
    try {
      const response = await dispatch(
        globalLoaderWrapper(dispatch, PATCH, 'news', { type, ...payload })
      );

      if (!response?.error) {
        setNews((newInfo) => {
          return {
            ...newInfo,
            items: [response.item, ...newInfo.items],
          };
        });

        toastNotification({
          type: notificationType.SUCCESS,
          message: response.message || 'New news posted',
        });
        handleModalClose();
      }

      if (response.error) {
        toastNotification({
          type: notificationType.ERROR,
          message: response.error,
        });
      }
    } catch (e) {
      toastNotification({ type: notificationType.ERROR, message: e.message });
    }
  };
  const handleCreateCoupon = async (payload, type) => {
    try {
      const response = await dispatch(
        globalLoaderWrapper(dispatch, PATCH, 'news', { type, ...payload })
      );

      if (!response?.error) {
        setNews((newInfo) => {
          return {
            ...newInfo,
            items: [response.item, ...newInfo.items],
          };
        });
        toastNotification({
          type: notificationType.SUCCESS,
          message: response.message || 'New coupon created',
        });

        handleModalClose();
      }

      if (response.error) {
        toastNotification({
          type: notificationType.ERROR,
          message: response.error,
        });
      }
    } catch (e) {
      toastNotification({ type: notificationType.ERROR, message: e.message });
    }
  };

  return (
    <WrapperContainer>
      {isPatron && <PartonHeaderB />}
      {!isPatron && <MerchantHeaderB />}
      <ContentSection className={classes.contentSection}>
        <BannerContainer className={classes.bannerContainer} id="scrollableDiv">
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <InfiniteScrollWrapper
                  fetchMoreData={async () => {
                    setIsLoading(true);
                    try {
                      await handleFetchMore({
                        ExclusiveStartKey: news?.LastEvaluatedKey,
                        ...queryParam,
                      });
                    } catch (error) {
                      if (isOnline) {
                        toastNotification({
                          type: notificationType.ERROR,
                          message: 'something went wrong',
                        });
                      }
                    }
                    setIsLoading(false);
                  }}
                  hasMore={!!news?.LastEvaluatedKey}
                  length={news?.items?.length ? news?.items?.length : 0}
                  scrollableTarget="scrollableDiv"
                >
                  {news?.items?.map((newsInfo, index) =>
                    isPatron ? (
                      <PatronNews
                        key={newsInfo.sk}
                        allowCouponClick={newsInfo?.flag_allow_clip}
                        index={index}
                        isPatron={isPatron}
                        news={newsInfo}
                        onCouponClick={onCouponClick}
                        onLike={onLike}
                        onShare={onShare}
                      />
                    ) : (
                      <MerchantNews
                        key={newsInfo.sk}
                        index={index}
                        isMerchant={isMerchant}
                        isPatron={isPatron}
                        news={newsInfo}
                        onDelete={onDelete}
                        onShare={onShare}
                      />
                    )
                  )}
                  {isLoading && <SkeletonLoading />}
                  {!isLoading && !news?.items?.length && <NoData />}
                </InfiniteScrollWrapper>
              </Grid>
            </Grid>
          </div>
        </BannerContainer>
      </ContentSection>
      <GenericModal handleClose={handleModalClose} isOpen={isModalOpen}>
        <CreateNewsModalBody
          createType={createType}
          handleClose={handleModalClose}
          handleUpload={isCoupon ? handleCreateCoupon : handleCreateNews}
        />
      </GenericModal>
      {isPatron ? (
        <PatronFooter isNewsDisabled />
      ) : (
        <MerchantNewFooter
          isCashier={isCashier}
          onNewCouponClick={onNewCouponClick}
          onNewNewsClick={onNewNewsClick}
        />
      )}
    </WrapperContainer>
  );
};

export default News;
