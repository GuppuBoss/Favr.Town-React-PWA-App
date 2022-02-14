/* eslint-disable react/jsx-max-depth */
/* eslint-disable no-unreachable */
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { formatEpochTime } from '../../../utils/timeUtil';
import classes from './conversation.module.scss';

const ConversationCard = ({ conversation }) => {
  const navigate = useNavigate();

  return (
    <Card className={classes.conversationAction}>
      <CardActionArea>
        <CardContent
          className={classes.cardContent}
          disabled={!conversation.url}
          onClick={() => {
            if (conversation.url) {
              navigate(conversation.url);
            }
          }}
        >
          <Grid container spacing={1}>
            <Grid
              alignContent="center"
              container
              item
              justifyContent="center"
              sm={2}
              xs={2}
            >
              <img
                alt="action-icon"
                className={classes.conversationIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(conversation?.partner?.url);
                }}
                src={
                  conversation?.partner?.profilePicture ||
                  conversation?.partner?.logo
                }
              />
            </Grid>
            <Grid container item justifyContent="center" sm={9} xs={9}>
              <Grid item sm={12} xs={12}>
                <Typography style={{ fontWeight: 600 }} variant="body2">
                  {conversation.topic}
                </Typography>
                <Typography variant="body2">
                  {conversation?.partner?.login}
                </Typography>
                <Typography variant="body2">
                  {formatEpochTime(conversation.time)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ConversationCard.propTypes = {
  conversation: PropTypes.shape({
    topic: PropTypes.number.isRequired,
    partner: PropTypes.shape({
      login: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
    time: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ConversationCard;
