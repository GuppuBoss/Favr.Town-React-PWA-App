/* eslint-disable react/jsx-max-depth */
import { Grid, Typography } from '@mui/material';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import followIcon from '../../../assets/images/icons/icon_follow.svg';
import shareIcon from '../../../assets/images/icons/icon_share.svg';
import unfollowIcon from '../../../assets/images/icons/icon_unfollow.svg';
import toastNotification from '../../../components/shared/alerts/toastNotification';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import ChipWrapper from '../../../components/shared/display/ChipWrapper';
import Reward from '../../../components/shared/display/Reward';
import FooterButton from '../../../components/shared/footers/FooterButton';
import GenericModal from '../../../components/shared/modals/GenericModal';
import notificationType from '../../../constants/notification';
import {
  getMerchantDetails,
  getMerchantStore,
} from '../../../redux/actions/patronActions';
import { getMerchantInfo } from '../../../redux/selectors/accountSelector';
import handleError from '../../../utils/errorHandling';
import useNetwork from '../../../utils/useNetwork';
import About from './About';
import HorizontalScroll from './HorizontalScroll';
import MerchantAboutHeadlines from './MerchantAboutHeadlines';
import classes from './merchantDetails.module.scss';
import RewardModalBody from './RewardModalBody';
import SkeletonCard from './SkeletonCard';
import StoreModalBody from './StoreModalBody';

const MerchantInfo = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const isOnline = useNetwork();
  const navigate = useNavigate();
  const { item: merchantDetails, flags: flag } = useSelector(getMerchantInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReward, setSelectedReward] = useState({});
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const { location } = window;

  const queryParam = Object.fromEntries(new URLSearchParams(location.search));

  const fetchMerchantInfo = async (payload) => {
    setIsLoading(true);
    try {
      const response = await dispatch(getMerchantDetails(dispatch, payload));
      if (response?.error) {
        handleError(response, navigate);
      }
      setIsLoading(false);

      return response;
    } catch (error) {
      if (isOnline) {
        return toastNotification({
          type: notificationType.ERROR,
          message: 'something went wrong',
        });
      }
      return setIsLoading(false);
    }
  };

  const fetchMerchantStoreList = async (payload) => {
    return dispatch(getMerchantStore(dispatch, payload));
  };

  useEffect(async () => {
    const payload = { id: params.id };
    if (!_.isEmpty(queryParam, true) && queryParam.action === 'follow') {
      const response = await fetchMerchantInfo({ ...payload, follow: true });
      if (!response.error) {
        toastNotification({
          type: notificationType.SUCCESS,
          message: 'Followed',
        });
        navigate(location.pathname);
      }
    } else {
      await fetchMerchantInfo(payload);
    }

    return () => {};
  }, []);

  const onRewardSelect = (reward) => {
    setSelectedReward(reward);
    setIsRewardModalOpen(true);
  };
  return (
    <div className={classes.merchantListBodyWrapper}>
      <Grid container spacing="2">
        {isLoading && <SkeletonCard />}

        {!isLoading && (
          <Grid container justifyContent="space-around" spacing={2}>
            <Grid
              alignItems="center"
              container
              item
              justifyContent="center"
              sm={3}
              xs={3}
            >
              <img
                alt="profileImage"
                className={classes.businessLogo}
                src={merchantDetails?.logo}
              />
            </Grid>
            <Grid item sm={9} xs={9}>
              <Typography className={classes.businessName} varient="h5">
                {merchantDetails?.businessName}
              </Typography>
              {merchantDetails?.tags &&
                merchantDetails?.tags?.map((tag) => (
                  <ChipWrapper
                    key={tag}
                    className={tag.includes('##') && classes.bold}
                    label={tag.includes('##') ? tag.substring(1) : tag}
                  />
                ))}
            </Grid>
            <About
              merchantDetails={merchantDetails}
              onStoreClick={setIsStoreModalOpen}
            />
            {merchantDetails?.rule_rewards.length !== 0 && (
              <>
                <MerchantAboutHeadlines headline="Rewards" />
                <HorizontalScroll
                  container
                  direction="row"
                  item
                  sm={12}
                  xs={12}
                >
                  {merchantDetails?.rule_rewards?.map((ruleReward) => (
                    <div key={ruleReward.a} className={classes.rewardWrapper}>
                      <Reward
                        onClickFunction={() => onRewardSelect(ruleReward)}
                        percent={ruleReward.percent}
                      />
                    </div>
                  ))}
                </HorizontalScroll>
              </>
            )}
            <MerchantAboutHeadlines headline="My Favr" />

            <Grid container item justifyContent="space-between" sm={12} xs={12}>
              <Grid>
                <FooterButton
                  onClick={(e) => {
                    e.preventDefault();
                    props.unFollowAction();
                  }}
                >
                  <StandardIcon
                    alt="actionIcon"
                    src={flag?.following ? unfollowIcon : followIcon}
                  />
                </FooterButton>
              </Grid>
              <Typography className={classes.favr} variant="body1">
                {merchantDetails?.favr}
              </Typography>
              <Grid>
                <FooterButton
                  onClick={async () => {
                    await props.shareAction();
                  }}
                >
                  <StandardIcon alt="qr" src={shareIcon} />
                </FooterButton>
              </Grid>
            </Grid>
          </Grid>
        )}
        {merchantDetails?.rule_rewards && (
          <GenericModal
            handleClose={setIsRewardModalOpen}
            isOpen={isRewardModalOpen}
          >
            <RewardModalBody
              handleClose={setIsRewardModalOpen}
              reward={selectedReward}
            />
          </GenericModal>
        )}
        {merchantDetails?.pk && (
          <GenericModal
            handleClose={setIsStoreModalOpen}
            isOpen={isStoreModalOpen}
          >
            <StoreModalBody
              fetchMerchantStore={fetchMerchantStoreList}
              handleClose={setIsStoreModalOpen}
              merchantPk={merchantDetails?.pk}
            />
          </GenericModal>
        )}
      </Grid>
    </div>
  );
};

export default MerchantInfo;

MerchantInfo.propTypes = {
  unFollowAction: PropTypes.func.isRequired,
  shareAction: PropTypes.func.isRequired,
};
