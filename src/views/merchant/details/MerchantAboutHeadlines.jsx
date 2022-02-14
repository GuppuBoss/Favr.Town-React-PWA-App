import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './merchantDetails.module.scss';

const MerchantAboutHeadlines = (props) => {
  return (
    <Grid
      alignSelf="auto"
      className={
        props.wrapperClassName
          ? `${classes.headlineWrapper} ${props.wrapperClassName}`
          : classes.headlineWrapper
      }
      container
      item
      justifyContent="center"
      sm={12}
      xs={12}
    >
      <Grid
        className={classes.alignCenter}
        item
        justifyContent="center"
        sm={3}
        xs={3}
      >
        <hr className="mt-2" />
      </Grid>
      <div className={classes.headline}> {props.headline}</div>
      <Grid
        className={classes.alignCenter}
        item
        justifyContent="center"
        sm={3}
        xs={3}
      >
        <hr className="mt-2" />
      </Grid>
    </Grid>
  );
};

MerchantAboutHeadlines.propTypes = {
  headline: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string.isRequired,
};

export default MerchantAboutHeadlines;
