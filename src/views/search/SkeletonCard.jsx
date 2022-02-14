import { Grid, Skeleton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';

import classes from './search.module.scss';

const SkeletonCard = () => {
  return (
    <Card className={classes.businessCard}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item sm={3} xs={3}>
            <Skeleton animation="wave" height={90} variant="rect" width={75} />
          </Grid>
          <Grid item sm={9} xs={9}>
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
