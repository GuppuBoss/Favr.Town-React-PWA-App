import { Skeleton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';

import classes from './merchantList.module.scss';

const SkeletonCard = () => {
  return (
    <Card className={classes.businessCard}>
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
            <Skeleton animation="wave" height={50} variant="rect" width={50} />
          </Grid>
          <Grid
            alignItems="center"
            container
            item
            justifyContent="center"
            sm={2}
            xs={2}
          >
            <Skeleton animation="wave" height={50} variant="rect" width={50} />
          </Grid>
          <Grid item sm={7} xs={7}>
            <Typography className={classes.businessName} varient="h5">
              <Skeleton animation="wave" />
            </Typography>
            <Typography className={classes.businessName} varient="h5">
              <Skeleton animation="wave" />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
