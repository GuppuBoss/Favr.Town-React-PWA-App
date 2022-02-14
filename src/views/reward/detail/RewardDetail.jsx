import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import MerchantHeaderB from '../../../components/shared/headers/MerchantHeaderB';
import GenericAreYouSureModal from '../../../components/shared/modals/GenericAreYouSureModal';
import { merchantActionTypes } from '../../../constants/actionTypes';
import notificationType from '../../../constants/notification';
import ROUTES from '../../../constants/routes';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { DELETE, GET, PATCH } from '../../../services/api';
import handleError from '../../../utils/errorHandling';
import { getContentHeight } from '../../../utils/window';
import classes from '../rewards.module.scss';
import RewardDetailFooter from './RewardDetailFooter';
import UpdateRewardForm from './UpdateRewardForm';

const contentSctionExtraStyle = {
  backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.93) 0 100%), url(https://img.favr.town/app/rewards-bg.png)`,
  height: getContentHeight(),
};

const RewardDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { history } = window;
  const [deleteRewardModalOpen, setDeleteRewardModalOpen] = useState(false);
  const [rewardData, setRewardData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [fetchError, setFetchError] = useState(false);

  const onSubmit = async (payload) => {
    const response = await PATCH(`reward?sk=${id}`, payload);
    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'Error saving data',
      });
    } else {
      dispatch({
        type: merchantActionTypes.SET_REWARDS,
        payload: response.items,
      });
    }
  };

  // upload Image
  const handleImageUpload = async (payload) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PATCH, 'image', {
        image: payload,
        type: 'reward',
        sk: id,
      })
    );

    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'Error saving image',
      });
      return;
    }

    const newData = response.item.rule_rewards.filter(
      (item) => item.sk === rewardData.sk
    );
    setSelectedImage(newData[0].image);
  };
  // image Delete
  const handleImageDelete = async () => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, DELETE, 'image', {
        url: selectedImage,
        sk: id,
      })
    );

    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'Error deleting image',
      });
      return;
    }
    setSelectedImage('');
  };

  useEffect(async () => {
    setIsLoading(true);
    const response = await dispatch(
      globalLoaderWrapper(dispatch, GET, 'reward', { sk: id })
    );
    setIsLoading(false);
    if (response.error) {
      handleError(response, navigate);
      toastNotification({
        type: notificationType.ERROR,
        message: 'Error while fetching data',
      });
    } else {
      setFetchError(false);
      setRewardData(response.item);
      setSelectedImage(response.item.image || '');
    }
  }, []);

  // reward delete
  const handleRewardDelete = async (sk) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, DELETE, 'reward', {
        sk,
      })
    );

    toastNotification({
      type: response?.error ? notificationType.ERROR : notificationType.SUCCESS,
      message: response?.error
        ? 'Error while deleting reward'
        : response.message,
    });

    if (!response.error) {
      setDeleteRewardModalOpen(false);
      navigate(ROUTES.REWARDS);
      history.length = 1;
    }
  };

  return (
    <WrapperContainer>
      <MerchantHeaderB />
      {!rewardData || isLoading || fetchError ? (
        ''
      ) : (
        <ContentSection style={contentSctionExtraStyle}>
          <div className={classes.rewardsMainContent}>
            <UpdateRewardForm
              handleImageDelete={handleImageDelete}
              handleImageUpload={handleImageUpload}
              onSubmit={onSubmit}
              rewardData={rewardData}
              selectedImage={selectedImage}
            />
            <Box display="flex" justifyContent="flex-end" mt={2} pb={3}>
              Claimed:
              <Typography style={{ marginLeft: '5px' }} variant="body1">
                0
              </Typography>
            </Box>
          </div>
        </ContentSection>
      )}
      <RewardDetailFooter
        handleRewardDelete={() => setDeleteRewardModalOpen(true)}
      />
      <GenericAreYouSureModal
        handleClose={() => setDeleteRewardModalOpen(false)}
        isOpen={deleteRewardModalOpen}
        onSubmit={() => handleRewardDelete(rewardData.sk)}
        warning="This will remove the selected reward."
      />
    </WrapperContainer>
  );
};

export default RewardDetail;
