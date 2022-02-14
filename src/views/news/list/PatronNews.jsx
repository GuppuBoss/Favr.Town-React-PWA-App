/* eslint-disable react/jsx-max-depth */
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import couponIcon from '../../../assets/images/icons/coupon.svg';
import followIcon from '../../../assets/images/icons/icon_follow.svg';
import shareIcon from '../../../assets/images/icons/icon_share.svg';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import ChipWrapper from '../../../components/shared/display/ChipWrapper';
import ExpirationComponent from '../../../components/shared/display/ExpirationComponent';
import classes from './news.module.scss';

const PatronNews = ({ news, index, allowCouponClick, onCouponClick }) => {
  const isCoupon = news?.type === 'coupon';
  const navigate = useNavigate();

  return (
    <Card
      className={
        !isCoupon
          ? classes.newsCard
          : `${classes.newsCard} ${classes.couponWrapper}`
      }
    >
      <IconButton
        aria-label="log-out"
        className={classes.coupon}
        component="button"
        disabled={!allowCouponClick}
        onClick={(e) => {
          e.stopPropagation();
          onCouponClick({
            pk: news?.pk,
            sk: news?.sk,
            index,
          });
        }}
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
          {news?.flag_clipped ? 'coupon clipped' : 'click to clip coupon'}
        </Typography>
      </IconButton>
      <CardActionArea
        onClick={() => {
          if (news?.profile?.url) {
            navigate(news?.url);
          }
        }}
      >
        <CardContent>
          <Grid container justifyContent="center" spacing={2}>
            <Grid container item sm={12} spacing={2} xs={12}>
              <Grid item sm={4} xs={4}>
                <img
                  alt="logo"
                  className={classes.image}
                  src={news?.profile?.logo}
                />
              </Grid>
              <Grid item sm={8} xs={8}>
                <Typography className={classes.businessName} variant="body1">
                  {news?.profile?.businessName}
                </Typography>
                {news?.profile?.tags &&
                  news?.profile?.tags?.map((tag) => (
                    <ChipWrapper
                      key={tag}
                      className={tag.includes('##') && classes.bold}
                      label={tag.includes('##') ? tag.substring(1) : tag}
                    />
                  ))}
              </Grid>
              <Grid item sm={12} xs={12}>
                <Typography variant="body2">{news?.text}</Typography>
              </Grid>
              {isCoupon && (
                <ExpirationComponent expirationTime={news?.redeem_by} />
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
                  {news?.stat_like}
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
                  {news?.stat_share}
                </Typography>
                <img alt="share" className="action-icon-mini" src={shareIcon} />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

PatronNews.propTypes = {
  // eslint-disable-next-line react/boolean-prop-naming
  allowCouponClick: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  news: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onCouponClick: PropTypes.func.isRequired,
};

export default PatronNews;
