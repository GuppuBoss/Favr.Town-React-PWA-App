import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDispatch } from 'react-redux';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import StandardButton from '../../../components/shared/buttons/StandardButton';
import notificationType from '../../../constants/notification';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { PUT } from '../../../services/api';
import getFeedbackMessage from '../../../utils/feedBackUtil';
import classes from '../survey.module.scss';
import VoteChoice from './VoteChoice';

const VoteModalBody = (props) => {
  const [voteId, setVoteId] = useState(null);
  const dispatch = useDispatch();
  const handleVote = (choiceId) => {
    if (choiceId !== voteId) {
      return setVoteId(choiceId);
    }

    return setVoteId(null);
  };

  const handleVoteButton = async () => {
    const data = { vote_id: voteId };
    try {
      const response = await dispatch(
        globalLoaderWrapper(dispatch, PUT, 'survey', data, {
          pk: props.pk,
          sk: props.sk,
        })
      );

      const feedbackMessage = getFeedbackMessage(response);

      toastNotification({
        type: response?.error
          ? notificationType.ERROR
          : notificationType.SUCCESS,
        message: feedbackMessage,
      });
      if (!response?.error) {
        props.setSurvey(response);
        props.handleClose(true);
      }
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  };
  return (
    <>
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">VOTE</Typography>
        <IconButton aria-label="close" onClick={props.handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <DialogContent className="remove-side-padding">
        <Carousel
          autoPlay={false}
          className={classes.carousel}
          navButtonsAlwaysInvisible
          swipe
        >
          {props?.choices?.map((choice, index) => (
            <VoteChoice
              key={choice.id}
              choice={choice}
              handleVote={handleVote}
              index={index}
              isPatron
              voteId={voteId}
            />
          ))}
        </Carousel>
      </DialogContent>
      <DialogActions className="remove-side-padding">
        <Grid container justifyContent="center">
          <Grid item>
            <StandardButton
              aria-label="log-out"
              component="span"
              isDisabled={voteId === null}
              onClick={handleVoteButton}
              variant="contained"
            >
              Vote
            </StandardButton>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

VoteModalBody.propTypes = {
  handleClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  choices: PropTypes.array.isRequired,
  sk: PropTypes.string.isRequired,
  pk: PropTypes.string.isRequired,
  setSurvey: PropTypes.func.isRequired,
};

export default VoteModalBody;
