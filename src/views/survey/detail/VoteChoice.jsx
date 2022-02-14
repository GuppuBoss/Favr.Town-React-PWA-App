/* eslint-disable react/jsx-max-depth */
import { Card, CardContent, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import StyledCheckIcon from '../../../components/shared/customIcons/StyledCheckIcon';
import TextFieldWithoutControl from '../../../components/shared/InputFields/TextFieldWithoutControl';
import classes from '../survey.module.scss';

const VoteChoice = ({ handleVote, choice, isPatron, voteId }) => {
  return (
    <Card onClick={() => handleVote(choice?.id)}>
      <CardContent>
        <Grid className={classes.positionRelative} container sm={12} xs={12}>
          {choice?.image && (
            <Grid item sm={12} xs={12}>
              <img
                alt="choice"
                className={classes.voteImage}
                src={choice?.image}
              />
            </Grid>
          )}
          {choice?.text && (
            <TextFieldWithoutControl
              disabled={isPatron}
              fullWidth
              isPassword={false}
              label="Text"
              maxRows={6}
              minRows={1}
              multiline
              value={choice.text}
            />
          )}
          {voteId === choice?.id && (
            <StyledCheckIcon className={classes.positionFix} />
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

VoteChoice.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  choice: PropTypes.object.isRequired,
  isPatron: PropTypes.bool.isRequired,
  voteId: PropTypes.number.isRequired,
  handleVote: PropTypes.func.isRequired,
};

export default VoteChoice;
