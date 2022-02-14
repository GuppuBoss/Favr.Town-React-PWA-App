import CreateIcon from '@mui/icons-material/Create';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './locations.module.scss';

const LocationCard = ({ location }) => {
  const navigate = useNavigate();

  return (
    <Card className={classes.cardWrapper}>
      <CardActionArea>
        <CardContent onClick={() => navigate(`/locations/${location.id}`)}>
          <Grid container>
            <Grid item sm={12} xs={12}>
              <Typography variant="body2">{location?.businessName}</Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Typography variant="body2">{location.street}</Typography>
              <Typography variant="body2">{`${location.city},${location.state} ${location.zip}`}</Typography>
            </Grid>
          </Grid>
          <Grid container item justifyContent="flex-end">
            <IconButton aria-label="close" size="small">
              <CreateIcon />
            </IconButton>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

LocationCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};

export default LocationCard;
