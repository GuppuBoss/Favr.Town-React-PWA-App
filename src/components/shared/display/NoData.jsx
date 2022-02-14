import { Grid, Typography } from '@mui/material';
import React from 'react';

const NoData = () => {
  return (
    <Grid container item justifyContent="center" sm={12} xs={12}>
      <Typography variant="body2">(New items will appear here.)</Typography>
    </Grid>
  );
};

export default NoData;
