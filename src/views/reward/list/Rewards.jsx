import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';
import MuiDialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import MerchantHeaderB from '../../../components/shared/headers/MerchantHeaderB';
import DialogWrapper from '../../../components/shared/modals/GenericModal';
import notificationType from '../../../constants/notification';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { DELETE, PATCH, POST } from '../../../services/api';
import { getContentHeight } from '../../../utils/window';
import classes from '../rewards.module.scss';
import RewardsFooter from '../RewardsFooter';
import AddRewardForm from './AddRewardForm';
import RewardItem from './RewardItem';

const contentSctionExtraStyle = {
  backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.93) 0 100%), url(https://img.favr.town/app/rewards-bg.png)`,
  height: getContentHeight(),
};

const Rewards = () => {
  const dispatch = useDispatch();
  const [rewards, setRewards] = useState([]);
  const [flags, setFlags] = useState({});
  const [addRewardModalOpen, setAddRewardModalOpen] = useState(false);
  const [isAddingReward, setRewardAdding] = useState(false);
  const [deleteRewardModalOpen, setDeleteRewardModalOpen] = useState('');
  const [deleteRewardLoading, setDeleteRewardLoading] = useState('');

  // reward delete
  const handleRewardDelete = async (sk) => {
    setDeleteRewardLoading(sk);

    const response = await dispatch(
      globalLoaderWrapper(dispatch, DELETE, 'reward', {
        sk,
      })
    );

    setDeleteRewardLoading('');

    toastNotification({
      type: response?.error ? notificationType.ERROR : notificationType.SUCCESS,
      message: response?.error
        ? 'Error while deleting reward'
        : response.message,
    });

    if (!response.error) {
      setRewards(response.items || []);
    }
  };

  const handleNewRewardSubmit = async (formData) => {
    setRewardAdding(true);
    const { redeem_by: redeemBy } = formData;

    setRewardAdding(false);

    const response = await dispatch(
      globalLoaderWrapper(dispatch, PATCH, 'reward', {
        ...formData,
        redeem_by: Math.round(redeemBy / 1000),
      })
    );

    setAddRewardModalOpen(false);
    setRewardAdding(false);
    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'Error saving data',
      });
    } else {
      toastNotification({
        type: notificationType.SUCCESS,
        message: response.message,
      });
      setRewards(response.items);
    }
  };

  const handleDeleteRewardModalCose = () => {
    setDeleteRewardModalOpen('');
  };
  const handleDeleteRewardModalOpen = (sk) => {
    setDeleteRewardModalOpen(sk);
  };
  const handleAddRewardModalOpen = () => {
    setAddRewardModalOpen(true);
  };
  const handleAddRewardModalClose = () => {
    setAddRewardModalOpen(false);
  };

  useEffect(async () => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, POST, 'reward')
    );
    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'Error while fetching data',
      });
    } else {
      setRewards(response.items || []);
      setFlags(response.flags);
    }
  }, []);

  return (
    <WrapperContainer>
      <MerchantHeaderB />
      <ContentSection style={contentSctionExtraStyle}>
        <div className={classes.rewardsMainContent}>
          {rewards.map((reward) => (
            <Box key={reward.sk}>
              <RewardItem
                key={reward.sk}
                deleteRewardLoading={deleteRewardLoading}
                deleteRewardModalOpen={deleteRewardModalOpen}
                handleDeleteRewardModalCose={handleDeleteRewardModalCose}
                handleDeleteRewardModalOpen={handleDeleteRewardModalOpen}
                handleRewardDelete={handleRewardDelete}
                rewardData={reward}
              />
            </Box>
          ))}
        </div>
      </ContentSection>
      <RewardsFooter
        handleAddRewardModalOpen={handleAddRewardModalOpen}
        isAllowAdd={flags?.allow_add}
      />

      <DialogWrapper
        handleClose={handleAddRewardModalClose}
        isOpen={addRewardModalOpen}
      >
        <>
          <MuiDialogTitle disableTypography>
            <Typography variant="h6">New Reward</Typography>
            <IconButton
              aria-label="close"
              className="margin-left-auto"
              onClick={handleAddRewardModalClose}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>

          <AddRewardForm
            isAddingReward={isAddingReward}
            onSubmit={handleNewRewardSubmit}
          />
        </>
      </DialogWrapper>
    </WrapperContainer>
  );
};

export default Rewards;
