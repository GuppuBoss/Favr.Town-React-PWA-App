import { Grid, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import couponIcon from '../../../assets/images/icons/coupon.svg';
import followIcon from '../../../assets/images/icons/icon_follow.svg';
import shareIcon from '../../../assets/images/icons/icon_share.svg';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import ChipWrapper from '../../../components/shared/display/ChipWrapper';
import ExpirationComponent from '../../../components/shared/display/ExpirationComponent';
import TextFieldWithoutControl from '../../../components/shared/InputFields/TextFieldWithoutControl';
import classes from '../list/news.module.scss';

const PatronNews = ({ news, onCouponClick }) => {
  const isCoupon = news?.item?.type === 'coupon';
  const navigate = useNavigate();

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid
        className={!isCoupon ? undefined : classes.couponWrapper}
        container
        item
        sm={12}
        spacing={2}
        xs={12}
      >
        <IconButton
          aria-label="log-out"
          className={classes.coupon}
          component="button"
          disabled={!news?.item?.flag_allow_clip}
          onClick={() =>
            onCouponClick({ pk: news?.item?.pk, sk: news?.item?.sk })
          }
          size="medium"
          style={{ display: !isCoupon ? 'none' : undefined }}
          type="submit"
          variant="contained"
        >
          <StandardIcon
            alt="coupon"
            className={classes.couponIcon}
            src={couponIcon}
          />
          <Typography variant="body2">
            {news?.item?.flag_clipped
              ? 'coupon clipped'
              : 'click to clip coupon'}
          </Typography>
        </IconButton>
        <Grid
          container
          item
          onClick={() => navigate(news?.item?.profile?.url)}
          sm={12}
          spacing={2}
          xs={12}
        >
          <Grid container item sm={3} xs={3}>
            <img
              alt="logo"
              className={classes.image}
              src={news?.item?.profile?.logo}
            />
          </Grid>
          <Grid container item sm={9} xs={9}>
            <Grid container item sm={12} xs={12}>
              <Typography varient="h5">
                {news?.item?.profile?.businessName}
              </Typography>
            </Grid>
            {news?.item?.profile?.tags &&
              news?.item?.profile?.tags?.map((tag) => (
                <ChipWrapper
                  key={tag}
                  className={tag.includes('##') && classes.bold}
                  label={tag.includes('##') ? tag.substring(1) : tag}
                />
              ))}
          </Grid>
        </Grid>
        <Grid item sm={12} xs={12}>
          <Typography variant="body2">{news?.item?.text}</Typography>
        </Grid>
        {news?.item?.link && (
          <Grid item sm={12} xs={12}>
            <Typography
              className={classes.link}
              onClick={() => {
                if (news?.item?.link) {
                  window.open(news?.item?.link, '_blank');
                }
              }}
              variant="body2"
            >
              {news?.item?.link}
            </Typography>
          </Grid>
        )}
        {isCoupon && (
          <>
            <ExpirationComponent expirationTime={news?.item?.redeem_by} />

            {news?.item?.redeem && (
              <Grid item sm={12} xs={12}>
                <TextFieldWithoutControl
                  disabled
                  label="redeem"
                  maxRows={6}
                  minRows={3}
                  multiline
                  value={news?.item?.redeem || ' '}
                />
              </Grid>
            )}
          </>
        )}
        {news?.item?.image && (
          <Grid item sm={12} xs={12}>
            <img alt="logo" className={classes.image} src={news?.item?.image} />
          </Grid>
        )}
        <Grid
          alignContent="center"
          container
          item
          justifyContent="flex-start"
          sm={6}
          xs={6}
        >
          <Typography className={classes.selfAlign} variant="body2">
            {news?.item?.stat_like || 0}
          </Typography>
          <img alt="like" className="action-icon-mini" src={followIcon} />
        </Grid>
        <Grid
          alignContent="center"
          container
          item
          justifyContent="flex-end"
          sm={6}
          xs={6}
        >
          <Typography className={classes.selfAlign} variant="body2">
            {news?.item?.stat_share || 0}
          </Typography>
          <img alt="share" className="action-icon-mini" src={shareIcon} />
        </Grid>
      </Grid>
    </Grid>
  );
};

PatronNews.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  news: PropTypes.object.isRequired,
  onCouponClick: PropTypes.func.isRequired,
};

export default PatronNews;
