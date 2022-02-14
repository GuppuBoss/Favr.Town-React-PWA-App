/* eslint-disable react/jsx-max-depth */
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import couponIcon from '../../../assets/images/icons/coupon.svg';
import followIcon from '../../../assets/images/icons/icon_follow.svg';
import newsIcon from '../../../assets/images/icons/icon_news.svg';
import shareIcon from '../../../assets/images/icons/icon_share.svg';
import ChipWrapper from '../../../components/shared/display/ChipWrapper';
import { formatEpochTime } from '../../../utils/timeUtil';
import classes from './news.module.scss';

const MerchantNews = ({ news, isMerchant, isPatron }) => {
  const isCoupon = news?.type === 'coupon';
  const isCashier = !isMerchant && !isPatron;
  const navigate = useNavigate();

  const {
    profile: { businessName, tags, about },
    text,
  } = news;
  return (
    <Card className={classes.newsCard}>
      <CardActionArea
        disabled={!news?.url}
        onClick={() => {
          if (news?.url) {
            navigate(news?.url);
          }
        }}
      >
        <CardContent>
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
              <Typography className={classes.businessName} varient="h5">
                {businessName}
              </Typography>
              {tags &&
                tags.map((tag) => (
                  <ChipWrapper
                    key={tag}
                    className={tag.includes('##') && classes.bold}
                    label={tag.includes('##') ? tag.substring(1) : tag}
                  />
                ))}
            </Grid>

            {about && (
              <Grid item sm={12} xs={12}>
                <Typography varient="h5">{about}</Typography>
              </Grid>
            )}

            {text && (
              <Grid item sm={12} xs={12}>
                <Typography varient="h5">{text}</Typography>
              </Grid>
            )}

            {isCoupon && (
              <Grid container item justifyContent="flex-end" sm={12} xs={12}>
                <Typography variant="body2">
                  Expires:{' '}
                  {news?.redeem_by
                    ? formatEpochTime(news?.redeem_by)
                    : '--/--/---- --:-- -'}
                </Typography>
              </Grid>
            )}
            {!isCashier && (
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
                <img
                  alt="share"
                  className="action-icon-mini"
                  src={followIcon}
                />
              </Grid>
            )}
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
                {news?.stat_share}
              </Typography>
              <img alt="share" className="action-icon-mini" src={shareIcon} />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

MerchantNews.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  news: PropTypes.object.isRequired,
  isMerchant: PropTypes.bool.isRequired,
  isPatron: PropTypes.bool.isRequired,
};

export default MerchantNews;
