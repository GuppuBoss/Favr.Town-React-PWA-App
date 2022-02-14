import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import ChipWrapper from '../../components/shared/display/ChipWrapper';
import classes from './search.module.scss';

const BusinessCard = ({ name, logo, tags, about, onImageClick }) => {
  return (
    <>
      <Grid item sm={3} xs={3}>
        <img
          alt="profileImage"
          className={classes.businessLogo}
          onClick={onImageClick}
          src={logo}
        />
      </Grid>
      <Grid item sm={9} xs={9}>
        <Typography className={classes.businessName} varient="h5">
          {name}
        </Typography>
        {tags &&
          tags.map((tag) => (
            <ChipWrapper
              key={tag}
              className={tag.includes('##') && classes.bold}
              label={tag.includes('##') ? tag.substring(1) : tag}
            />
          ))}
      </Grid>
      {about && (
        <Grid item sm={12} xs={12}>
          <Typography varient="h5">{about}</Typography>
        </Grid>
      )}
    </>
  );
};

BusinessCard.propTypes = {
  name: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  logo: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default BusinessCard;
