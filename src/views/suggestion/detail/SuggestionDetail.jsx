import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import BannerContainer from '../../../components/shared/containers/BannerContainer';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import SuggestionFooter from '../../../components/shared/footers/SuggestionFooter';
import MerchantHeaderB from '../../../components/shared/headers/MerchantHeaderB';
import PartonHeaderB from '../../../components/shared/headers/PartonHeaderB';
import notificationType from '../../../constants/notification';
import userGroupsTypes from '../../../constants/users';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { getAuthenticatedUser } from '../../../redux/selectors/accountSelector';
import { DELETE, GET, PUT } from '../../../services/api';
import getUserGroup from '../../../utils/authUtil';
import { saveToClipBoard } from '../../../utils/clipboard';
import handleError from '../../../utils/errorHandling';
import { getContentHeight } from '../../../utils/window';
import SkeletonLoading from '../list/SkeletonLoading';
import SuggestionCard from '../list/SuggestionCard';
import classes from './suggestionDetail.module.scss';

const SuggestionDetail = () => {
  const navigate = useNavigate();
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const dispatch = useDispatch();
  const userGroup = getUserGroup(authenticatedUser);

  const params = useParams();
  const [suggestionDetail, setSuggestionDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestion = async () => {
    const response = await GET('suggestion', params);
    if (response?.error) {
      handleError(response, navigate);
    }
    setSuggestionDetail(response);
  };
  const isPatron = userGroup === userGroupsTypes.PATRON;

  useEffect(() => {
    setIsLoading(true);
    fetchSuggestion();
    setIsLoading(false);
    return () => {};
  }, []);

  const getHeader = () => {
    if (userGroup === userGroupsTypes.PATRON) {
      return <PartonHeaderB />;
    }

    return <MerchantHeaderB />;
  };

  const deleteSuggestion = async ({ pk, sk }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, DELETE, 'suggestion', { pk, sk })
    );

    if (!response.error) {
      setSuggestionDetail({});
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

  const onShare = async ({ pk, sk }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'action', { share: { pk, sk } })
    );

    if (!response.error) {
      await saveToClipBoard(response.item.url);
      setSuggestionDetail((suggestion) => {
        return {
          ...suggestion,
          item: {
            ...suggestion.item,
            stat_share: response?.item?.stat_share,
          },
        };
      });
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

  const onLike = async ({ pk, sk }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'action', { like: { pk, sk } })
    );

    if (!response.error) {
      setSuggestionDetail((suggestion) => {
        return {
          ...suggestion,
          item: {
            ...suggestion.item,
            stat_like: response?.item?.stat_like,
          },
        };
      });
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
  return (
    <WrapperContainer>
      {getHeader()}
      <ContentSection className={classes.contentSection}>
        <BannerContainer
          className={classes.bannerContainer}
          id="scrollableDiv"
          style={{ height: getContentHeight() }}
        >
          <div className={classes.root}>
            {isLoading && <SkeletonLoading />}
            {!isLoading && suggestionDetail.item && (
              <SuggestionCard
                deleteSuggestion={deleteSuggestion}
                flags={suggestionDetail?.flags}
                isPatron={isPatron}
                onLike={onLike}
                onShare={onShare}
                suggestion={suggestionDetail.item}
              />
            )}
          </div>
        </BannerContainer>
      </ContentSection>
      <SuggestionFooter />
    </WrapperContainer>
  );
};

export default SuggestionDetail;
