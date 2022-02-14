/* eslint-disable react/no-multi-comp */
import Skeleton from '@mui/lab/Skeleton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

const variants = ['h2', 'h4', 'h3', 'h4', 'h3', 'h4', 'body1'];

const TypographyDemo = () => {
  return (
    <Grid item sm={12} xs={12}>
      {variants.map((variant) => (
        <Typography key={variant} component="div" variant={variant}>
          <Skeleton animation="wave" />
        </Typography>
      ))}
    </Grid>
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
