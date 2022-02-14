import { Skeleton } from '@mui/lab';
import { Box, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';

import classes from '../patrons.module.scss';

const SkeletonPatronItem = () => {
  return (
    <Card className={classes.patronCard}>
      <CardContent className={classes.patronCardContent}>
        <Grid alignItems="center" container spacing={1}>
          <Grid alignItems="center" container item xs={3}>
            <Skeleton
              animation="wave"
              height={70}
              variant="rect"
              width="100%"
            />
          </Grid>
          <Grid item xs={9}>
            <Skeleton
              animation="wave"
              height={70}
              variant="rect"
              width="100%"
            />
          </Grid>
          <Box display="flex" justifyContent="end" width="100%">
            <Typography color="textSecondary" variant="caption">
              <Skeleton
                animation="wave"
                height={10}
                variant="rect"
                width={30}
              />
            </Typography>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SkeletonPatronItem;
