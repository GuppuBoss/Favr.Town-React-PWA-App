/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-no-undef */
import { Skeleton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';

import classes from './conversationDetails.module.scss';

const SkeletonCard = () => {
  return (
    <Grid item sm={12} xs={12}>
      <Card className={classes.messageCard}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item sm={3} xs={3}>
              <Skeleton
                animation="wave"
                height={75}
                variant="rect"
                width={60}
              />
            </Grid>
            <Grid item sm={6} xs={6}>
              <Typography variant="body1">
                <Skeleton animation="wave" />
              </Typography>
              <Typography variant="body1">
                <Skeleton animation="wave" />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const MyMessageSkeleton = () => {
  return (
    <Grid container justifyContent="flex-end">
      <Grid item sm={9} xs={10}>
        <Card className={classes.chatCard}>
          <Grid container item justifyContent="space-around" sm={12} xs={12}>
            <Grid item sm={7} xs={7}>
              <Typography variant="body2">
                <Skeleton animation="wave" />
              </Typography>
              <Typography variant="body2">
                <Skeleton animation="wave" />
              </Typography>
            </Grid>
            <Grid container item justifyContent="center" sm={3} xs={3}>
              <Skeleton
                animation="wave"
                height={75}
                variant="rect"
                width={60}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export const YourMessages = () => {
  return (
    <Grid container justifyContent="flex-start">
      <Grid item sm={9} xs={10}>
        <Card className={classes.chatCard}>
          <Grid container item justifyContent="space-around" sm={12} xs={12}>
            <Grid container item justifyContent="center" sm={3} xs={3}>
              <Skeleton
                animation="wave"
                height={75}
                variant="rect"
                width={60}
              />
            </Grid>
            <Grid item sm={7} xs={7}>
              <Typography variant="body2">
                <Skeleton animation="wave" />
              </Typography>
              <Typography variant="body2">
                <Skeleton animation="wave" />
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SkeletonCard;
