import { Skeleton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';
import React from 'react';

const SkeletonCard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item sm={3} xs={3}>
        <Skeleton animation="wave" height={75} variant="rect" width={60} />
      </Grid>
      <Grid item sm={9} xs={9}>
        <Typography variant="body1">
          <Skeleton animation="wave" />
        </Typography>
        <Typography variant="body1">
          <Skeleton animation="wave" />
        </Typography>
      </Grid>

      <Grid item sm={12} xs={12}>
        <Typography variant="body2">
          <Skeleton animation="wave" />
        </Typography>
        <Typography variant="body2">
          <Skeleton animation="wave" />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SkeletonCard;
