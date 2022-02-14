import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { formatEpochTime } from '../../../utils/timeUtil';

const ExpirationComponent = ({ expirationTime, claimed }) => {
  const getTime = () => {
    if (claimed) {
      return formatEpochTime(claimed);
    }
    if (expirationTime) {
      return formatEpochTime(expirationTime);
    }
    return '--/--/----';
  };
  return (
    <Grid container item justifyContent="flex-end" sm={12} xs={12}>
      <Typography variant="body2">
        {claimed ? 'Redeemed' : 'Expires'}: {getTime()}
      </Typography>
    </Grid>
  );
};

ExpirationComponent.propTypes = {
  expirationTime: PropTypes.number.isRequired,
  claimed: PropTypes.number.isRequired,
};

export default ExpirationComponent;
