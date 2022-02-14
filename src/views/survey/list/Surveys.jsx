/* eslint-disable react/jsx-max-depth */
import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import BannerContainer from '../../../components/shared/containers/BannerContainer';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import InfiniteScrollWrapper from '../../../components/shared/display/InfiniteScrollWrapper';
import MerchantSurveyFooter from '../../../components/shared/footers/MerchantSurveyFooter';
import StandardFooter from '../../../components/shared/footers/StandardFooter';
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
import SkeletonCard from '../SkeletonLoading';
import classes from '../survey.module.scss';
import CreateSurveyModalBody from './CreateSurveyModal';
import MerchantSurvey from './MerchantSurvey';
import PatronSurvey from './PatronSurvey';

const Surveys = () => {
  const dispatch = useDispatch();
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);
  const isOnline = useNetwork();
  const location = useLocation();
  const [surveys, setSurveys] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryParam = Object.fromEntries(new URLSearchParams(location.search));
  const fetchSurveys = async (payload) => {
    setIsLoading(true);
    try {
      const response = await POST('survey', payload);

      setSurveys(response);
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

  const isPatron = userGroup === userGroupsTypes.PATRON;

  const handleFetchMore = (payload) => {
    fetchSurveys(payload);
  };

  useEffect(() => {
    fetchSurveys({ ...queryParam });
    return () => {};
  }, []);

  const onDelete = async ({ sk, index }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, DELETE, 'surveys', { sk })
    );

    if (!response.error) {
      surveys?.items.splice(index, 1);
      const updatedNews = { ...surveys };
      setSurveys(updatedNews);

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

  const onShare = async ({ pk, sk, index }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'action', { share: { pk, sk } })
    );
    // const response = await PUT('action', { share: { pk, sk } });
    await saveToClipBoard(response?.item?.url);

    if (!response.error) {
      const updatedNews = { ...surveys };
      updatedNews.items[index].stat_share = response.item.stat_share;
      setSurveys(updatedNews);

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

  const handleSurveyCreate = async (payload) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PATCH, 'survey', payload)
    );

    if (!response.error) {
      setSurveys((newInfo) => {
        return {
          ...newInfo,
          items: [response.item, ...newInfo.items],
        };
      });
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

  return (
    <WrapperContainer>
      {isPatron && <PartonHeaderB />}
      {!isPatron && <MerchantHeaderB />}
      <ContentSection className={classes.contentSection}>
        <BannerContainer className={classes.bannerContainer} id="scrollableDiv">
          <div className={classes.root}>
            <Grid container justifyContent="center" spacing={2}>
              {!isLoading && !surveys?.items?.length && (
                <Grid container item justifyContent="center" sm={12} xs={12}>
                  <Typography variant="body2">
                    (New items will appear here.)
                  </Typography>
                </Grid>
              )}

              <Grid item sm={12} xs={12}>
                <InfiniteScrollWrapper
                  fetchMoreData={async () => {
                    await handleFetchMore({
                      ExclusiveStartKey: surveys?.LastEvaluatedKey,
                      ...queryParam,
                    });
                  }}
                  hasMore={!!surveys?.LastEvaluatedKey}
                  length={surveys?.items?.length ? surveys?.items?.length : 0}
                  scrollableTarget="scrollableDiv"
                >
                  {surveys?.items?.map((survey, index) =>
                    isPatron ? (
                      <PatronSurvey
                        key={survey.sk}
                        index={index}
                        survey={survey}
                      />
                    ) : (
                      <MerchantSurvey
                        key={survey.sk}
                        index={index}
                        onDelete={onDelete}
                        onShare={onShare}
                        survey={survey}
                      />
                    )
                  )}
                  {isLoading && <SkeletonCard />}
                </InfiniteScrollWrapper>
              </Grid>
            </Grid>
          </div>
        </BannerContainer>
      </ContentSection>
      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateSurveyModalBody
          handleClose={() => setIsModalOpen(false)}
          handleUpload={handleSurveyCreate}
        />
      </GenericModal>
      {isPatron && <StandardFooter />}
      {!isPatron && (
        <MerchantSurveyFooter onClick={() => setIsModalOpen(true)} />
      )}
    </WrapperContainer>
  );
};

export default Surveys;
