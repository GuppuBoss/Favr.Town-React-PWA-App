/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/no-multi-comp */
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { formatEpochTime } from '../../../utils/timeUtil';
import classes from './conversationDetails.module.scss';

const CardContentWrapper = withStyles(() => ({
  root: {
    padding: '8px !important',
  },
}))(CardContent);

const GridWrapper = withStyles(() => ({
  'spacing-xs-1': {
    margin: '0px',
  },
}))(Grid);

const YourMessages = ({ message }) => {
  return (
    <Grid container justifyContent="flex-start">
      <Grid container item sm={9} xs={10}>
        <Card className={classes.chatCard}>
          <CardContentWrapper>
            <GridWrapper
              container
              justifyContent="flex-start"
              sm={12}
              spacing={1}
              xs={12}
            >
              <Grid container item justifyContent="center" sm={2} xs={2}>
                <img
                  alt="user"
                  className={classes.userImage}
                  src={message?.from?.profilePicture || message?.from?.logo}
                />
              </Grid>
              <Grid item sm={7} xs={7}>
                <Typography className={classes.messageText} variant="body2">
                  {message.message}
                </Typography>
              </Grid>
              {message?.link && (
                <Grid item sm={12} xs={12}>
                  <Link target="_blank" to={{ pathname: message?.link }}>
                    {message?.link}
                  </Link>
                </Grid>
              )}
              <Grid container item justifyContent="flex-start" sm={12} xs={12}>
                <Grid container item sm={12} xs={12}>
                  <Typography variant="body2">
                    {message?.from?.login}
                  </Typography>
                </Grid>
                <Grid container item sm={12} xs={12}>
                  <Typography variant="body2">
                    {formatEpochTime(message.time)}
                  </Typography>
                </Grid>
              </Grid>
            </GridWrapper>
          </CardContentWrapper>
        </Card>
      </Grid>
    </Grid>
  );
};

const MyMessages = ({ message }) => {
  return (
    <Grid container justifyContent="flex-end">
      <Grid container item sm={9} xs={10}>
        <Card className={classes.chatCard}>
          <CardContentWrapper>
            <GridWrapper
              container
              justifyContent="space-between"
              sm={12}
              spacing={1}
              xs={12}
            >
              <Grid item sm={7} xs={7}>
                <Typography className={classes.messageText} variant="body2">
                  {message.message}
                </Typography>
              </Grid>
              <Grid container item justifyContent="center" sm={2} xs={2}>
                <img
                  alt="user"
                  className={classes.userImage}
                  src={message?.from?.profilePicture || message?.from?.logo}
                />
              </Grid>
              {message?.link && (
                <Grid item sm={12} xs={12}>
                  <Link target="_blank" to={{ pathname: message?.link }}>
                    {message?.link}
                  </Link>
                </Grid>
              )}
              <Grid container item justifyContent="flex-end" sm={12} xs={12}>
                <Grid container item justifyContent="flex-end" sm={12} xs={12}>
                  <Typography variant="body2">
                    {message?.from?.login}
                  </Typography>
                </Grid>
                <Grid container item justifyContent="flex-end" sm={10} xs={10}>
                  <Typography variant="body2">
                    {formatEpochTime(message.time)}
                  </Typography>
                </Grid>
              </Grid>
            </GridWrapper>
          </CardContentWrapper>
        </Card>
      </Grid>
    </Grid>
  );
};

const Messages = ({ message }) => {
  if (message?.from?.owner) return <MyMessages message={message} />;
  return <YourMessages message={message} />;
};

Messages.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
};

export default Messages;
