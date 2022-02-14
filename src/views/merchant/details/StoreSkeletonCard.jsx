import { Grid, Skeleton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';

import classes from './merchantDetails.module.scss';

const StoreSkeletonCard = () => {
  return (
    <Card className={classes.businessCard}>
      <CardContent>
        <Grid container justifyContent="space-around" spacing={2}>
          <Grid item sm={12} xs={12}>
            <Typography className={classes.businessName} variant="body">
              <Skeleton animation="wave" />
            </Typography>
          </Grid>
          <Grid item sm={12} xs={12}>
            <Typography className={classes.businessName} variant="body">
              <Skeleton animation="wave" />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StoreSkeletonCard;
