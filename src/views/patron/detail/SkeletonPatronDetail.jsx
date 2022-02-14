import { Skeleton } from '@mui/lab';
import { Grid } from '@mui/material';
import React from 'react';

import classes from '../patrons.module.scss';

const SkeletonPatronDetail = () => {
  return (
    <Grid container spacing={1}>
      <Grid alignItems="center" container item xs={3}>
        <Skeleton
          animation="wave"
          className={classes.skeletonSpan}
          height={90}
          variant="rect"
          width="100%"
        />
      </Grid>
      <Grid item xs={9}>
        <Skeleton
          animation="wave"
          className={classes.skeletonSpan}
          height={90}
          variant="rect"
          width="100%"
        />
      </Grid>
    </Grid>
  );
};

export default SkeletonPatronDetail;
