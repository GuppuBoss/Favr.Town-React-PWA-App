/* eslint-disable react/jsx-max-depth */
import './override.scss';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import StandardButton from '../../../components/shared/buttons/StandardButton';
import ExpirationComponent from '../../../components/shared/display/ExpirationComponent';
import Reward from '../../../components/shared/display/Reward';
import classes from './merchantDetails.module.scss';

const RewardModalBody = ({ handleClose, reward }) => {
  const navigate = useNavigate();

  return (
    <>
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">Redeem Reward</Typography>

        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => handleClose(false)}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <DialogContent className="remove-side-padding">
        <Grid
          className={classes.gridRoot}
          container
          justifyContent="space-between"
        >
          <Grid container spacing={2}>
            <Grid item sm={3} xs={3}>
              <Reward percent={reward.percent} />
            </Grid>
            <Grid item sm={9} xs={9}>
              <Typography variant="body2"> {reward.description}</Typography>
            </Grid>
            {reward.redeem && (
              <Grid item sm={12} xs={12}>
                <Typography variant="body2">{reward.redeem}</Typography>
              </Grid>
            )}
            <ExpirationComponent expirationTime={reward?.redeem_by} />

            <Grid container item justifyContent="center">
              <Grid className={classes.buttonWrapper} item>
                <StandardButton
                  aria-label="log-out"
                  className={classes.iconButton}
                  component="span"
                  isDisabled={
                    !reward.allow_redeem ||
                    !reward.percent ||
                    reward.percent < 100
                  }
                  onClick={() => {
                    if (reward.url) {
                      navigate(reward.url);
                    }
                  }}
                  variant="contained"
                >
                  REDEEM
                </StandardButton>
              </Grid>
            </Grid>
            {reward.image && (
              <Grid item>
                <img
                  alt="reward"
                  className={classes.rewardImage}
                  src={reward.image}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </>
  );
};

RewardModalBody.propTypes = {
  handleClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  reward: PropTypes.object.isRequired,
};

export default RewardModalBody;
