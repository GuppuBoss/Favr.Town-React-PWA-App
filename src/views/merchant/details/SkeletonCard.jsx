import { Grid, Skeleton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';

import classes from './merchantDetails.module.scss';

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
            sm={3}
            xs={3}
          >
            <Skeleton animation="wave" height={70} variant="rect" width={70} />
          </Grid>

          <Grid item sm={9} xs={9}>
            <Typography className={classes.businessName} variant="h5">
              <Skeleton animation="wave" />
            </Typography>
            <Typography className={classes.businessName} variant="h5">
              <Skeleton animation="wave" />
            </Typography>
          </Grid>
          <Grid item sm={12} xs={12}>
            <Typography className={classes.businessName} variant="h5">
              <Skeleton animation="wave" />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
