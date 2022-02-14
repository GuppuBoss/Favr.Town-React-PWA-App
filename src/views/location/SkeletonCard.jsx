import { Skeleton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';

const SkeletonCard = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item sm={3} xs={3}>
            <Skeleton animation="wave" height={75} variant="rect" width={60} />
          </Grid>
          <Grid item sm={6} xs={6}>
            <Typography variant="body1">
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="body1">
              <Skeleton animation="wave" />
            </Typography>
          </Grid>
          <Grid item sm={3} xs={3}>
            <Typography variant="body1">
              <Skeleton animation="wave" />
            </Typography>
            <Typography variant="body1">
              <Skeleton animation="wave" />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
