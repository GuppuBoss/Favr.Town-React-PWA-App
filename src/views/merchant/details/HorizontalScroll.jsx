import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './merchantDetails.module.scss';

const HorizontalScroll = ({ children, ...rest }) => {
  return (
    <Grid className={classes.horizontalScrollWrapper} {...rest}>
      {children}
    </Grid>
  );
};

HorizontalScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default HorizontalScroll;
