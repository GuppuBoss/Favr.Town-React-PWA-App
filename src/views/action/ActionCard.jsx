/* eslint-disable react/jsx-max-depth */
/* eslint-disable no-unreachable */
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import actionIcon from '../../assets/images/icons/icon_action.svg';
import { formatEpochTime } from '../../utils/timeUtil';
import actionIconMap from './actionIconMap';
import classes from './actions.module.scss';

const ActionCard = ({ action }) => {
  const navigate = useNavigate();
  const getIcon = (type) => {
    if (actionIconMap[type]) {
      return (
        <img
          alt="action-icon"
          className={classes.actionIcon}
          src={actionIconMap[type]}
        />
      );
    }

    return (
      <img alt="action-icon" className={classes.actionIcon} src={actionIcon} />
    );
  };
  return (
    <Card className={classes.actionCard}>
      <CardActionArea>
        <CardContent
          disabled={!action.url}
          onClick={() => {
            if (action.url) {
              navigate(action.url);
            }
          }}
        >
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid container item justifyContent="center" sm={2} xs={2}>
              {getIcon(action.type)}
            </Grid>
            <Grid container item justifyContent="center" sm={6} xs={6}>
              <Typography variant="body2">{action.text}</Typography>
            </Grid>
            <Grid container item justifyContent="center" sm={3} xs={3}>
              <Typography variant="body2">
                {formatEpochTime(action.time, 'MM/dd/yyyy')}
                <br />
                {formatEpochTime(action.time, 'h:mm a')}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ActionCard.propTypes = {
  action: PropTypes.shape({
    time: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ActionCard;
