import { Skeleton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';

import classes from './coupons.module.scss';

const SkeletonCard = () => {
  return (
    <Card className={classes.businessCard}>
      <CardContent>
        <Grid container justifyContent="space-around" spacing={2}>
          <Grid item sm={12} xs={12}>
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
