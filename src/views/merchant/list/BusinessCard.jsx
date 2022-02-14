/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-sort-props */
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import ChipWrapper from '../../../components/shared/display/ChipWrapper';
import Reward from '../../../components/shared/display/Reward';
import classes from './merchantList.module.scss';

const BusinessCard = ({ name, logo, tags, url, about, rewardPercent }) => {
  const navigate = useNavigate();

  return (
    <Card className={classes.businessCard}>
      <CardActionArea
        disabled={!url}
        onClick={() => {
          if (url) {
            navigate(url);
          }
        }}
      >
        <CardContent>
          <Grid container justifyContent="space-around" spacing={2}>
            <Grid
              alignItems="center"
              container
              item
              justifyContent="center"
              sm={2}
              xs={2}
            >
              <Reward percent={rewardPercent} />
            </Grid>
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
                src={logo}
              />
            </Grid>
            <Grid item sm={7} xs={7}>
              <Typography className={classes.businessName} varient="h5">
                {name}
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
            <Grid item sm={12} xs={12}>
              <Typography varient="h5">{about}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

BusinessCard.propTypes = {
  name: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  rewardPercent: PropTypes.number.isRequired,
  logo: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default BusinessCard;
