// import '../reset.scss';

import { Box, LinearProgress, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';

const LinearProgressWrapper = (props) => {
  const getValue = props?.value ? Math.round(props.value) : 0;
  const primaryColor =
    props?.index === 0 ? 'rgba(38, 192, 38, 0.856)' : '#BF40BF';
  const BorderLinearProgress = withStyles(() => ({
    root: {
      height: '12px',
    },
    colorPrimary: {
      backgroundColor: 'rgba(211, 211, 211, 0.6)',
    },
    barColorPrimary: {
      backgroundColor: primaryColor,
    },
  }))(LinearProgress);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <BorderLinearProgress
          colorPrimary="red"
          size={40}
          thickness={5}
          variant="determinate"
          {...props}
          value={getValue}
        />
      </Box>
      <Box sx={{ minWidth: 30 }}>
        <Typography
          color="text.secondary"
          variant="body2"
        >{`${getValue}%`}</Typography>
      </Box>
    </Box>
  );
};

LinearProgressWrapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default LinearProgressWrapper;
