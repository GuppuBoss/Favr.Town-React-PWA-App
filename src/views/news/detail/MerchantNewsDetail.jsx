import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import couponIcon from '../../../assets/images/icons/coupon.svg';
import followIcon from '../../../assets/images/icons/icon_follow.svg';
import newsIcon from '../../../assets/images/icons/icon_news.svg';
import shareIcon from '../../../assets/images/icons/icon_share.svg';
import toastNotification from '../../../components/shared/alerts/toastNotification';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import ExpirationComponent from '../../../components/shared/display/ExpirationComponent';
import FooterButton from '../../../components/shared/footers/FooterButton';
import DateTimePickerWrapper from '../../../components/shared/InputFields/DateTimePicker';
import ImageViewerAndUpload from '../../../components/shared/InputFields/image/ImageViewerAndUpload';
import InputField from '../../../components/shared/InputFields/TextField';
import notificationType from '../../../constants/notification';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { DELETE, PATCH } from '../../../services/api';
import { getEpochMilliSec, getEpochSec } from '../../../utils/timeUtil';
import classes from '../list/news.module.scss';
import newsSchema from './updateNewsSchema';

const MerchantNewsDetail = ({ news, isCoupon, isMerchant, onShare }) => {
  const [selectedImage, setSelectedImage] = useState(news?.item?.image);
  const dispatch = useDispatch();

  const { control, formState, handleSubmit, trigger, setError } = useForm({
    mode: 'onBlur',
    defaultValues: {
      text: news?.item?.text,
      link: news?.item?.link,
      redeem_by: news?.item?.redeem_by
        ? getEpochMilliSec(news?.item?.redeem_by)
        : undefined,
    },
    resolver: yupResolver(newsSchema),
  });

  // upload Image
  const handleImageUpload = async (payload) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PATCH, 'image', {
        image: payload,
        type: 'news',
        sk: news.item.sk,
      })
    );

    if (response?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }

    if (!response.error) {
      setSelectedImage(response.item.image);
    }
  };
  // image Delete
  const handleImageDelete = async () => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, DELETE, 'image', {
        url: selectedImage,
        sk: news.item.sk,
      })
    );

    if (response?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }

    if (!response.error) {
      setSelectedImage(undefined);
    }
  };

  const updateNews = async (field, payload) => {
    const isValid = await trigger(field);

    if (isValid) {
      const data = PATCH('news', payload, { sk: news.item.sk });
      if (data.error) {
        setError(field, {
          type: 'Submission',
          message: 'Error saving data',
        });
      }
    }
  };

  const updateDate = async (field, payload) => {
    const isValid = await trigger(field);

    if (isValid) {
      const epochTime = getEpochSec(payload[field], 17);

      const data = await PATCH(
        'news',
        { [field]: epochTime },
        { sk: news.item.sk }
      );

      if (data.error) {
        setError(field, {
          type: 'Submission',
          message: 'Error saving data',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item sm={3} xs={3}>
          <Button aria-label="close" disabled size="small">
            <img
              alt="coupon"
              className={classes.couponIcon}
              src={isCoupon ? couponIcon : newsIcon}
            />
          </Button>
        </Grid>
        <Grid item sm={9} xs={9}>
          <InputField
            autoUpdate
            control={control}
            disabled={!isMerchant}
            error={formState.errors.text}
            fullWidth
            isPassword={false}
            label="Text"
            maxRows={6}
            minRows={3}
            multiline
            name="text"
            updateFunction={updateNews}
          />
        </Grid>
        {(isMerchant || (!isMerchant && news?.item?.link)) && (
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate
              control={control}
              disabled={!isMerchant}
              error={formState.errors.link}
              fullWidth
              isPassword={false}
              label="URL (optional)"
              name="link"
              updateFunction={updateNews}
            />
          </Grid>
        )}
        {(isMerchant || (!isMerchant && news?.item?.image)) && (
          <Grid item sm={12} xs={12}>
            <Box className={classes.newsImgContainer}>
              <ImageViewerAndUpload
                aspectRatioX={800}
                aspectRatioY={600}
                defaultPicture={selectedImage}
                deleteFunction={handleImageDelete}
                imageClassName={classes.newsImage}
                isGrayScale
                uploadFunction={handleImageUpload}
              />
            </Box>
          </Grid>
        )}
        {isCoupon && !isMerchant && (
          <ExpirationComponent expirationTime={news?.item?.redeem_by} />
        )}
        {isCoupon && isMerchant && (
          <Grid container item justifyContent="flex-end" sm={12} xs={12}>
            <Grid container item justifyContent="space-between" sm={12} xs={12}>
              <Grid className={classes.selfAlign} item sm={3} xs={4}>
                <Typography variant="body2">Expires:</Typography>
              </Grid>
              <Grid item sm={6} xs={8}>
                <DateTimePickerWrapper
                  alignTextRight
                  autoUpdate
                  control={control}
                  error={formState.errors.redeem_by}
                  fullWidth
                  isFutureDateDisabled={false}
                  label="Redeem By"
                  margin="none"
                  name="redeem_by"
                  showDate
                  updateFunction={updateDate}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid container item sm={12} xs={12}>
          <Grid
            alignContent="center"
            container
            item
            justifyContent="flex-start"
            sm={6}
            xs={6}
          >
            <Typography className={classes.selfAlign} variant="body2">
              {news?.item?.stat_like ? news?.item?.stat_like : 0}
            </Typography>
            <img alt="share" className="action-icon-mini" src={followIcon} />
          </Grid>
          <Grid
            alignContent="center"
            container
            item
            justifyContent="flex-end"
            sm={6}
            style={{ marginLeft: 'auto' }}
            xs={6}
          >
            <Typography className={classes.selfAlign} variant="body2">
              {news?.item?.stat_share ? news?.item?.stat_share : 0}
            </Typography>
            <FooterButton
              isDisabled={news?.flags?.allow_show}
              onClick={() => {
                return onShare({ pk: news?.item?.pk, sk: news?.item?.sk });
              }}
              type="button"
            >
              <StandardIcon alt="share" src={shareIcon} />
            </FooterButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

MerchantNewsDetail.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  news: PropTypes.object.isRequired,
  isMerchant: PropTypes.bool.isRequired,
  isCoupon: PropTypes.bool.isRequired,
  onShare: PropTypes.func.isRequired,
};

export default MerchantNewsDetail;
