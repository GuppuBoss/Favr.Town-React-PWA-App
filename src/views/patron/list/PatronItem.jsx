import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from '../patrons.module.scss';

const PatronItem = ({ patron }) => {
  const navigate = useNavigate();

  const patronDetailPage = () => {
    navigate(patron.url);
  };

  return (
    <Card className={classes.patronCard} onClick={patronDetailPage}>
      <CardContent className={classes.patronCardContent}>
        <Grid container spacing={1}>
          <Grid alignItems="center" container item xs={3}>
            <img
              alt={`patron-${patron.firstName}`}
              className={classes.profilePicture}
              src={patron.profilePicture}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography className={classes.detail} variant="body2">
              {patron?.details}
            </Typography>
          </Grid>
          <Box textAlign="right" width="100%">
            <Typography color="textSecondary" variant="caption">
              {patron.active}
            </Typography>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PatronItem;

PatronItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  patron: PropTypes.object.isRequired,
};
