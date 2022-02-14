import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import BannerContainer from '../../../components/shared/containers/BannerContainer';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import NewsDetailFooter from '../../../components/shared/footers/NewsDetailFooter';
import MerchantHeaderB from '../../../components/shared/headers/MerchantHeaderB';
import PartonHeaderB from '../../../components/shared/headers/PartonHeaderB';
import GenericAreYouSureModal from '../../../components/shared/modals/GenericAreYouSureModal';
import notificationType from '../../../constants/notification';
import ROUTES from '../../../constants/routes';
import userGroupsTypes from '../../../constants/users';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { getAuthenticatedUser } from '../../../redux/selectors/accountSelector';
import { DELETE, GET, PUT } from '../../../services/api';
import getUserGroup from '../../../utils/authUtil';
import { saveToClipBoard } from '../../../utils/clipboard';
import handleError from '../../../utils/errorHandling';
import useNetwork from '../../../utils/useNetwork';
import classes from '../list/news.module.scss';
import SkeletonLoading from '../list/SkeletonLoading';
import MerchantNewsDetail from './MerchantNewsDetail';
import PatronNewsDetail from './PatronNewsDetail';

const NewsDetails = () => {
  const dispatch = useDispatch();
  const isOnline = useNetwork();
  const navigate = useNavigate();
  const { history } = window;
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const [newsDetail, setNewsDetail] = useState({});
  const param = useParams();
  const userGroup = getUserGroup(authenticatedUser);

  const isPatron = userGroup === userGroupsTypes.PATRON;
  const isMerchant = userGroup === userGroupsTypes.MERCHANT;

  const isCoupon = newsDetail?.item?.type === 'coupon';

  const fetchNewsDetail = async () => {
    setIsLoading(true);
    try {
      const response = await GET('news', param);

      if (response?.error) {
        handleError(response, navigate);
      }

      setNewsDetail(response);
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
  useEffect(() => {
    fetchNewsDetail();
    return () => {};
  }, []);

  const onShare = async ({ pk, sk }) => {
    try {
      const response = await dispatch(
        globalLoaderWrapper(dispatch, PUT, 'action', { share: { pk, sk } })
      );
      // const response = await PUT('action', { share: { pk, sk } });

      if (!response.error) {
        await saveToClipBoard(response?.item?.url);
        const updatedNews = { ...newsDetail };
        updatedNews.item.stat_share = response.item.stat_share;
        setNewsDetail(updatedNews);

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
    } catch (e) {
      toastNotification({
        type: notificationType.ERROR,
        message: e.message,
      });
    }
  };

  const onDelete = async ({ sk }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, DELETE, 'news', { sk })
    );

    if (!response.error) {
      setNewsDetail({});

      toastNotification({
        type: notificationType.SUCCESS,
        message: response.message,
      });
      navigate(ROUTES.NEWS);
      history.length = 1;
    }

    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }
  };

  const onLike = async ({ pk, sk }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'action', { like: { pk, sk } })
    );
    // const response = await PUT('action', { share: { pk, sk } });
    await saveToClipBoard(response?.item?.url);

    if (!response.error) {
      const updatedNews = { ...newsDetail };
      updatedNews.item.stat_like = response.item.stat_like;
      setNewsDetail(updatedNews);

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

  const onCouponClick = async ({ pk, sk }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'news', { pk, sk })
    );

    if (!response.error) {
      setNewsDetail(response);

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

  const handleOnDeleteButtonClick = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <WrapperContainer>
      {isPatron && <PartonHeaderB />}
      {!isPatron && <MerchantHeaderB />}
      <ContentSection className={classes.contentSection}>
        <BannerContainer className={classes.bannerContainer} id="scrollableDiv">
          <div className={classes.root}>
            {isLoading && <SkeletonLoading />}
            {!isPatron && newsDetail?.item && (
              <MerchantNewsDetail
                isCoupon={isCoupon}
                isMerchant={isMerchant}
                news={newsDetail}
                onShare={onShare}
              />
            )}
            {isPatron && newsDetail?.item && (
              <PatronNewsDetail
                isCoupon={isCoupon}
                isCouponClicked={!newsDetail?.flags?.allow_modify}
                news={newsDetail}
                onCouponClick={onCouponClick}
              />
            )}
          </div>
        </BannerContainer>
      </ContentSection>
      <GenericAreYouSureModal
        handleClose={() => setIsDeleteModalOpen(false)}
        isOpen={isDeleteModalOpen}
        onSubmit={() =>
          onDelete({ pk: newsDetail?.item?.pk, sk: newsDetail?.item?.sk })
        }
        warning="This will remove the selected news."
      />
      <NewsDetailFooter
        handleLikeUnlike={isPatron ? onLike : handleOnDeleteButtonClick}
        handleSuggestion={onShare}
        isLikeDisabled={newsDetail?.flags?.allow_like}
        isMerchant={isMerchant}
        isPatron={isPatron}
        isShareDisabled={!newsDetail?.flags?.allow_share}
        isUnLikeDisabled={newsDetail?.flags?.allow_remove}
        like={newsDetail?.item?.stat_like}
        pk={newsDetail?.item?.pk}
        share={newsDetail?.item?.stat_share}
        sk={newsDetail?.item?.sk}
      />
    </WrapperContainer>
  );
};

export default NewsDetails;
