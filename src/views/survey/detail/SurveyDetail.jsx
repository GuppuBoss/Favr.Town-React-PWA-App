import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import BannerContainer from '../../../components/shared/containers/BannerContainer';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import MerchantSurveyDetailFooter from '../../../components/shared/footers/MerchantSurveyDetailFooter';
import PatronSurveyDetailFooter from '../../../components/shared/footers/PatronSurveyDetailFooter';
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
import SkeletonCard from '../SkeletonLoading';
import classes from '../survey.module.scss';
import MerchantSurveyDetail from './MerchantSurveyDetail';
import PatronSurveyDetail from './PatronSurveyDetail';

const SurveyDetail = () => {
  const [shouldShowConfirmationModal, setShouldShowConfirmationModal] =
    useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { history } = window;
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);

  const [survey, setSurvey] = useState({});
  const isPatron = userGroup === userGroupsTypes.PATRON;

  const fetchSurvey = async () => {
    setIsLoading(true);
    const response = await GET('survey', params);
    if (response?.error) {
      handleError(response, navigate);
    }
    setSurvey(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSurvey({});
    return () => {};
  }, []);

  const onLike = async ({ pk, sk }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'action', { like: { pk, sk } })
    );
    // const response = await PUT('action', { share: { pk, sk } });
    await saveToClipBoard(response?.item?.url);

    if (!response.error) {
      const updatedNews = { ...survey };
      updatedNews.item.stat_like = response.item.stat_like;
      setSurvey(updatedNews);

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
    // const response = await PUT('action', { share: { pk, sk } });
    await saveToClipBoard(response?.item?.url);

    if (!response.error) {
      const updatedNews = { ...survey };
      updatedNews.item.stat_share = response.item.stat_share;
      setSurvey(updatedNews);

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

  const onDelete = async () => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, DELETE, 'survey', { sk: survey?.item?.sk })
    );

    if (!response.error) {
      toastNotification({
        type: notificationType.SUCCESS,
        message: response.message,
      });
      setShouldShowConfirmationModal(false);
      navigate(ROUTES.SURVEYS);
      history.length = 1;
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
      {!isPatron && <MerchantHeaderB />}
      {isPatron && <PartonHeaderB />}
      <ContentSection className={classes.contentSection}>
        <BannerContainer className={classes.bannerContainer} id="scrollableDiv">
          <div className={classes.root}>
            {!isPatron && survey?.item && (
              <MerchantSurveyDetail setSurvey={setSurvey} survey={survey} />
            )}
            {isPatron && survey?.item && (
              <PatronSurveyDetail setSurvey={setSurvey} survey={survey} />
            )}
            {isLoading && <SkeletonCard />}
          </div>
        </BannerContainer>
      </ContentSection>
      {isPatron && (
        <PatronSurveyDetailFooter
          handleLike={onLike}
          handleShare={onShare}
          isShareDisabled={survey.flag_allow_vote}
          like={survey?.item?.stat_like}
          pk={survey?.item?.pk}
          share={survey?.item?.stat_share}
          sk={survey?.item?.sk}
        />
      )}
      <GenericAreYouSureModal
        handleClose={() => {
          setShouldShowConfirmationModal(false);
        }}
        isOpen={shouldShowConfirmationModal}
        onSubmit={() => {
          onDelete();
        }}
        warning="This will remove the selected survey."
      />
      {!isPatron && (
        <MerchantSurveyDetailFooter
          handleShare={onShare}
          onDelete={() => {
            setShouldShowConfirmationModal(true);
          }}
          pk={survey?.item?.pk}
          sk={survey?.item?.sk}
        />
      )}
    </WrapperContainer>
  );
};

export default SurveyDetail;
