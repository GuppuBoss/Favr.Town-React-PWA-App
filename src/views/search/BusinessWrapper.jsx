import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './search.module.scss';

const BusinessCardWrapper = ({ url, children }) => {
  const navigate = useNavigate();
  return (
    <Card className={classes.businessCard}>
      <CardActionArea>
        <CardContent
          disabled={!url}
          onClick={() => {
            if (url) {
              navigate(url);
            }
          }}
        >
          <Grid container spacing={2}>
            {children}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

BusinessCardWrapper.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BusinessCardWrapper;
