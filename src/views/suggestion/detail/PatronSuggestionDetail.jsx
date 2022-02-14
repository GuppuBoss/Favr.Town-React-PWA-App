import { Grid, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import couponIcon from '../../../assets/images/icons/coupon.svg';
import classes from './suggestionDetail.module.scss';

const PatronSuggestionDetail = ({ suggestion }) => {
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={3}>
          <img
            alt="logo"
            className={classes.image}
            src={suggestion?.items[0]?.profile?.profilePicture}
          />
        </Grid>
        <Grid container item sm={9} xs={9}>
          <Typography variant="body1">
            {suggestion?.profile?.businessName}
          </Typography>
          {suggestion?.profile?.tags &&
            suggestion?.profile?.tags?.map((tag) => (
              <div
                key={tag}
                className={
                  tag.includes('##')
                    ? classes.chipRippleUpgradedMain
                    : classes.chipRippleUpgraded
                }
                role="row"
                style={{ marginRight: '7px' }}
              >
                <span className="chip__text" role="button">
                  {tag.includes('##') ? tag.substring(1) : tag}
                </span>
              </div>
            ))}
        </Grid>
        <Grid item sm={12} xs={12}>
          <Typography variant="body2">DUmmy text</Typography>
        </Grid>
        <Grid item sm={12} xs={12}>
          <img
            alt="suggestion"
            className={classes.suggestionImage}
            src={suggestion?.items[0]?.profile?.profilePicture}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Link to={{ pathname: suggestion?.items[0]?.profile?.url }}>
            Go to link
          </Link>
        </Grid>
        <Grid
          className={classes.couponWrapper}
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
            size="medium"
            type="submit"
            variant="contained"
          >
            <img alt="coupon" className={classes.couponIcon} src={couponIcon} />
            <Typography variant="body2">click to clip coupon</Typography>
          </IconButton>
          <Grid item sm={3} xs={3}>
            <img
              alt="logo"
              className={classes.image}
              src={suggestion?.items[0]?.profile?.profilePicture}
            />
          </Grid>
          <Grid container item sm={9} xs={9}>
            <Typography variant="body1">
              {suggestion?.profile?.businessName}
            </Typography>
            {suggestion?.profile?.tags &&
              suggestion?.profile?.tags?.map((tag) => (
                <div
                  key={tag}
                  className={
                    tag.includes('##')
                      ? classes.chipRippleUpgradedMain
                      : classes.chipRippleUpgraded
                  }
                  role="row"
                  style={{ marginRight: '7px' }}
                >
                  <span className="chip__text" role="button">
                    {tag.includes('##') ? tag.substring(1) : tag}
                  </span>
                </div>
              ))}
          </Grid>
          <Grid item sm={12} xs={12}>
            <Typography variant="body2">DUmmy text</Typography>
          </Grid>
          <Grid container item justifyContent="flex-end" sm={12} xs={12}>
            <Typography variant="body2">Expires:</Typography>
            <Typography variant="body2">test value</Typography>
          </Grid>
          <Grid item sm={12} xs={12}>
            <Typography variant="body2">Dummy redeem</Typography>
          </Grid>
          <Grid item sm={12} xs={12}>
            <img
              alt="suggestion"
              className={classes.suggestionImage}
              src={suggestion?.items[0]?.profile?.profilePicture}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <Link to={{ pathname: suggestion?.items[0]?.profile?.url }}>
              Go to link
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

PatronSuggestionDetail.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  suggestion: PropTypes.object.isRequired,
};

export default PatronSuggestionDetail;
