import {
  Box,
  // Button,
  // Collapse,
  Grid,
  // Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import StandardButton from '../../../components/shared/buttons/StandardButton';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import Reward from '../../../components/shared/display/Reward';
import MerchantHeaderB from '../../../components/shared/headers/MerchantHeaderB';
import GenericAreYouSureModal from '../../../components/shared/modals/GenericAreYouSureModal';
import DialogWrapper from '../../../components/shared/modals/GenericModal';
import notificationType from '../../../constants/notification';
import userGroupsTypes from '../../../constants/users';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { getAuthenticatedUser } from '../../../redux/selectors/accountSelector';
import { GET, PUT } from '../../../services/api';
import getUserGroup from '../../../utils/authUtil';
import handleError from '../../../utils/errorHandling';
import useNetwork from '../../../utils/useNetwork';
import MerchantAboutHeadlines from '../../merchant/details/MerchantAboutHeadlines';
import { contentSctionExtraStyle } from '../list/Patrons';
import classes from '../patrons.module.scss';
import PatronCouponModal from './PatronCouponModal';
import PatronDetailFooter from './PatronDetailFooter';
import PatronDetailModalBody from './PatronDetailModalBody';
import PatronFavrModal from './PatronFavrModal';
import PatronRewardModalBody from './PatronRewardModalBody';
import PurchaseModal from './PurchaseModal';
import SkeletonPatronDetail from './SkeletonPatronDetail';

const PatronInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isOnline = useNetwork();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const actionParamValue = query.get('action');
  const rewardParamValue = query.get('reward');
  const couponParamValue = query.get('coupon');
  const authenticatedUser = useSelector(getAuthenticatedUser);

  const [patronInfo, setPatronInfo] = useState({});
  const [flags, setFlags] = useState({});
  const [couponInfo, setCouponInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPatronDetailModalOpen, setIsPatronDetailModalOpen] = useState(false);
  const [isPatronRewardModalOpen, setIsPatronRewardModalOpen] = useState('');
  const [isPatronPurchaseModalOpen, setIsPatronPurchaseModalOpen] =
    useState(false);
  const [isPatronFavrModalOpen, setIsPatronFavrModalOpen] = useState(false);
  const [isPatronCouponModalOpen, setIsPatronCouponModalOpen] = useState(false);
  const userGroup = getUserGroup(authenticatedUser);

  const isMerchant = userGroup === userGroupsTypes.MERCHANT;

  const handlePatronCopunModalClose = () => {
    setIsPatronCouponModalOpen(false);
  };

  const handlePatronFavrModalClose = () => {
    setIsPatronFavrModalOpen(false);
  };
  const handlePatronFavrModalOpen = () => {
    setIsPatronFavrModalOpen(true);
  };
  const handlePatronPurchaseModalClose = () => {
    setIsPatronPurchaseModalOpen(false);
  };
  const handlePatronPurchaseModalOpen = () => {
    setIsPatronPurchaseModalOpen(true);
  };
  const handlePatronRewardModalClose = () => {
    setIsPatronRewardModalOpen('');
  };
  const handlePatronRewardModalOpen = (sk) => {
    setIsPatronRewardModalOpen(sk);
  };
  const handlePatronDetailModalClose = () => {
    setIsPatronDetailModalOpen(false);
  };
  const handlePatronDetailModalOpen = () => {
    setIsPatronDetailModalOpen(true);
  };

  // const handleCollapsAction = () => {
  //   setIsStatisticsShow(!isStatisticsShow);
  // };
  const redeemReward = async (action) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'patron', { patron_id: id, action })
    );

    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error || 'Something went wrong',
      });
    }
  };
  const purchaseAction = async () => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'patron', {
        patron_id: id,
        action: { type: 'purchase' },
      })
    );

    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error || 'Something went wrong',
      });
      return;
    }
    setPatronInfo(response.item || {});
    setFlags(response.flags || {});
    handlePatronPurchaseModalClose();
    if (response.message) {
      toastNotification({
        type: notificationType.SUCCESS,
        message: response.message,
      });
    }
  };

  const sendWitdrawAction = async (action) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'patron', {
        patron_id: id,
        action: { ...action },
      })
    );

    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error || 'Something went wrong',
      });
      return;
    }
    setPatronInfo(response.item || {});
    setFlags(response.flags || {});
    handlePatronFavrModalClose();
    if (response.message) {
      toastNotification({
        type: notificationType.SUCCESS,
        message: response.message,
      });
    }
  };

  useEffect(async () => {
    setIsLoading(true);
    try {
      let payload;
      if (actionParamValue) {
        payload = { patron_id: id, action: { type: actionParamValue } };
      } else if (rewardParamValue) {
        payload = {
          patron_id: id,
          action: { type: 'reward', reward_sk: rewardParamValue },
        };
      } else if (couponParamValue) {
        payload = {
          patron_id: id,
          action: { type: 'coupon', coupon_id: parseInt(couponParamValue, 10) },
        };
      }

      let response;
      if (payload) {
        response = await PUT('patron', payload);
      } else {
        response = await GET('patron', { id });
      }
      if (response.error) {
        handleError(response, navigate);

        toastNotification({
          type: notificationType.ERROR,
          message: response.error || 'Something went wrong',
        });
        setIsLoading(false);
        return;
      }
      if (response.flags?.wipe_query_params) navigate(location.pathname);

      if (couponParamValue) {
        setCouponInfo(response?.item?.coupon);
        setPatronInfo(response.item || {});
        navigate(location.pathname);
        setIsPatronCouponModalOpen(true);
        toastNotification({
          type: notificationType.SUCCESS,
          message: response.message,
        });

        setIsLoading(false);
        return;
      }
      setPatronInfo(response.item || {});
      setFlags(response.flags || {});
      if (response.message) {
        toastNotification({
          type: notificationType.SUCCESS,
          message: response.message,
        });
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
  }, [id]);

  return (
    <WrapperContainer>
      <MerchantHeaderB />

      <ContentSection style={contentSctionExtraStyle}>
        <Grid
          alignItems="center"
          className={classes.patronsMainContent}
          container
          spacing={1}
        >
          {isLoading ? (
            <SkeletonPatronDetail />
          ) : (
            <>
              <Grid item xs={3}>
                <img
                  alt={patronInfo.pk}
                  className={classes.profilePicture}
                  src={patronInfo?.patron_details?.profilePicture}
                />
              </Grid>
              <Grid
                className={classes.readOnlyForm}
                container
                item
                onClick={handlePatronDetailModalOpen}
                spacing={1}
                xs={9}
              >
                <Grid item xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    label="Login"
                    value={patronInfo.login}
                    variant="outlined"
                  />
                </Grid>
                <Grid container item justifyContent="space-between" spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      disabled
                      fullWidth
                      label="First Name"
                      value={patronInfo?.patron_details?.firstName || ' '}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled
                      fullWidth
                      label="Last Name"
                      value={patronInfo?.patron_details?.lastName || ' '}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Grid>
              {patronInfo?.rule_rewards?.length !== 0 && (
                <>
                  <MerchantAboutHeadlines
                    headline="Reward Progress"
                    wrapperClassName={classes.rewardsHeader}
                  />
                  <Grid
                    className={classes.rewardProgressBarContainer}
                    container
                    item
                  >
                    {patronInfo.rule_rewards &&
                      patronInfo.rule_rewards.map((reward) => (
                        <Box key={reward.sk} mr={4}>
                          <Reward
                            onClickFunction={() =>
                              handlePatronRewardModalOpen(reward.sk)
                            }
                            percent={reward.percent}
                          />
                        </Box>
                      ))}
                  </Grid>
                </>
              )}
              <MerchantAboutHeadlines headline="Earned Favr" />
              <Grid container item justifyContent="center">
                <Typography align="right" component="div" variant="h4">
                  <Box fontWeight="500">{patronInfo.favr}</Box>
                </Typography>
              </Grid>
              <MerchantAboutHeadlines headline="Actions" />
              <Grid container item justifyContent="space-between">
                <StandardButton
                  onClick={handlePatronPurchaseModalOpen}
                  variant="contained"
                >
                  PURCHASE
                </StandardButton>
                <StandardButton
                  onClick={handlePatronFavrModalOpen}
                  variant="contained"
                >
                  SEND FAVR
                </StandardButton>
              </Grid>
              {/* {!isMerchant && (
                <Box mt={2} width="100%">
                  <Grid container spacing={2}>
                    <Grid item sm={5} xs={8}>
                      <TextField
                        disabled
                        fullWidth
                        label="Phone"
                        value={patronInfo?.patron_details?.phone || ' '}
                        variant="outlined"
                      />
                    </Grid>
                    {patronInfo?.patron_details?.accept_birthday && (
                      <Grid item sm={7} xs={7}>
                        <TextField
                          disabled
                          fullWidth
                          label="Email"
                          value={patronInfo?.patron_details?.email || ' '}
                          variant="outlined"
                        />
                      </Grid>
                    )}
                    {patronInfo?.patron_details?.accept_mail && (
                      <Grid item sm={12} xs={12}>
                        <TextField
                          className={classes.detail}
                          disabled
                          fullWidth
                          label="Address"
                          multiline
                          value={patronInfo?.patron_details?.mail || ' '}
                          variant="outlined"
                        />
                      </Grid>
                    )}
                  </Grid>
                </Box>
              )} */}
              {/* {isMerchant && (
                <Box mt={2} width="100%">
                  <Button
                    endIcon={
                      // eslint-disable-next-line react-perf/jsx-no-jsx-as-prop
                      isStatisticsShow ? <ExpandLessIcon /> : <ExpandMoreIcon />
                    }
                    onClick={handleCollapsAction}
                  >
                    Statistics
                  </Button>
                  <Collapse in={isStatisticsShow}>
                    <Paper className={classes.statistics}>
                      {Object.keys(patronInfo).map(
                        (key) =>
                          key.startsWith('stat_') &&
                          !key.startsWith('stat_new_') && (
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              mb={1}
                              width="100%"
                            >
                              <Box>{key.split('_')[1]}</Box>
                              <Box>patronInfo[key]</Box>
                            </Box>
                          )
                      )}
                    </Paper>
                  </Collapse>
                </Box>
              )} */}
              <DialogWrapper
                handleClose={handlePatronDetailModalClose}
                isOpen={isPatronDetailModalOpen}
              >
                <PatronDetailModalBody
                  handlePatronDetailModalClose={handlePatronDetailModalClose}
                  patronDetails={patronInfo.patron_details}
                />
              </DialogWrapper>
              {patronInfo.rule_rewards &&
                patronInfo.rule_rewards.map((reward) => (
                  <DialogWrapper
                    key={reward.sk}
                    handleClose={handlePatronRewardModalClose}
                    isOpen={isPatronRewardModalOpen === reward.sk}
                  >
                    <PatronRewardModalBody
                      balance={patronInfo.favr}
                      handlePatronRewardModalClose={
                        handlePatronRewardModalClose
                      }
                      patronReward={reward}
                      redeemReward={redeemReward}
                      setPatronInfo={setPatronInfo}
                    />
                  </DialogWrapper>
                ))}
              <PurchaseModal
                handlePatronPurchaseModalClose={handlePatronPurchaseModalClose}
                isPatronPurchaseModalOpen={isPatronPurchaseModalOpen}
                purchaseAction={purchaseAction}
              />
              <GenericAreYouSureModal
                handleClose={handlePatronPurchaseModalClose}
                isOpen={isPatronPurchaseModalOpen}
                onSubmit={purchaseAction}
                warning="This will register this patron's visit as purchase  ."
              />
              <PatronFavrModal
                balance={patronInfo.favr}
                handlePatronFavrModalClose={handlePatronFavrModalClose}
                isPatronFavrModalOpen={isPatronFavrModalOpen}
                sendWitdrawAction={sendWitdrawAction}
              />
            </>
          )}
        </Grid>
      </ContentSection>

      <PatronDetailFooter
        actionUrl={flags.action_url}
        conversationUrl={flags.conversation_url}
        isMerchant={isMerchant}
      />
      <PatronCouponModal
        couponData={couponInfo}
        handlePatronCopunModalClose={handlePatronCopunModalClose}
        isPatronCouponModalOpen={isPatronCouponModalOpen}
      />
    </WrapperContainer>
  );
};

export default PatronInfo;
