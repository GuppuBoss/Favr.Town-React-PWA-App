/* eslint-disable react/no-multi-comp */
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';

import classes from './qr.module.scss';

const TypographyDemo = () => {
  return (
    <>
      <Grid container item justifyContent="center" sm={12} xs={12}>
        <Skeleton animation="wave" height={200} variant="rect" width={200} />
      </Grid>
      <Grid
        className={classes.skeletonButton}
        container
        item
        justifyContent="center"
        sm={12}
        xs={12}
      >
        <Skeleton animation="wave" height={30} variant="rect" width={70} />
      </Grid>
    </>
  );
};

const SkeletonLoading = () => {
  return (
    <Grid item xs>
      <TypographyDemo />
    </Grid>
  );
};

export default SkeletonLoading;
