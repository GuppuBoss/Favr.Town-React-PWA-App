import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import StandardButton from '../../../components/shared/buttons/StandardButton';
import TextFieldWithoutControl from '../../../components/shared/InputFields/TextFieldWithoutControl';
import GenericModal from '../../../components/shared/modals/GenericModal';
import classList from '../../../components/shared/modals/modal.module.scss';
import { formatEpochTime } from '../../../utils/timeUtil';
import classes from '../patrons.module.scss';

const PatronRewardModal = ({
  balance,
  handlePatronRewardModalClose,
  patronReward,
  redeemReward,
  setPatronInfo,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography className="align-self-center" variant="h6">
          Redeem Reward
        </Typography>
        <IconButton
          aria-label="close"
          className="margin-left-auto"
          onClick={handlePatronRewardModalClose}
          size="small"
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        {patronReward?.name && (
          <Grid item xs={12}>
            <Typography variant="body1">{patronReward?.name}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextFieldWithoutControl
            disabled
            fullWidth
            maxRows={6}
            minRows={3}
            multiline
            value={patronReward?.description || ' '}
            variant="outlined"
          />
        </Grid>
        <Grid alignItems="center" container item justifyContent="space-around">
          <Box textAlign="center">
            <Typography variant="body1">Reward Value</Typography>
            <Typography component="div" variant="body1">
              <Box fontWeight={600}>
                {typeof patronReward?.favr === 'number'
                  ? patronReward?.favr
                  : '--'}
              </Box>
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body1">Favr Balance</Typography>
            <Typography component="div" variant="body1">
              <Box fontWeight={600}>
                {typeof balance === 'number' ? balance : '--'}
              </Box>
            </Typography>
          </Box>
        </Grid>
        <Grid container item justifyContent="center">
          <StandardButton
            className={classes.redeemButton}
            isDisabled={!patronReward?.allow_redeem}
            onClick={handleOpenModal}
            variant="contained"
          >
            REDEEM
          </StandardButton>
        </Grid>
        {patronReward?.redeem && (
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="Redemption"
              maxRows={6}
              minRows={3}
              multiline
              value={patronReward?.redeem || ' '}
              variant="outlined"
            />
          </Grid>
        )}
        {patronReward?.redeem_by && (
          <Grid alignItems="center" container item justifyContent="flex-end">
            <Typography variant="body1">
              Expires: {formatEpochTime(patronReward?.redeem_by)}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          {patronReward?.image && (
            <Box
              border={1}
              borderColor="grey.500"
              borderRadius={5}
              height={220}
              overflow="hidden"
            >
              <img alt="patron-reward" src={patronReward?.image} width="100%" />
            </Box>
          )}
        </Grid>
        <GenericModal handleClose={handleCloseModal} isOpen={isModalOpen}>
          <>
            <Box fontWeight={600} mb={2}>
              ARE YOU SURE?
            </Box>
            <div className={classList.areYouSureModalButtonWrapper}>
              <button
                className={classList.normalButtonWrapper}
                onClick={handleCloseModal}
                type="button"
              >
                CANCEL
              </button>
              <button
                className={classList.normalButtonWrapper}
                onClick={async () => {
                  const result = await redeemReward({
                    type: 'reward',
                    reward_sk: patronReward.sk,
                  });
                  if (!result?.error) {
                    setPatronInfo(result.item);
                  }
                  handleCloseModal();
                  handlePatronRewardModalClose();
                }}
                type="button"
              >
                CONFIRM
              </button>
            </div>
          </>
        </GenericModal>
      </Grid>
    </>
  );
};

export default PatronRewardModal;

PatronRewardModal.propTypes = {
  handlePatronRewardModalClose: PropTypes.func.isRequired,
  redeemReward: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  patronReward: PropTypes.object.isRequired,
  balance: PropTypes.number.isRequired,
  setPatronInfo: PropTypes.func.isRequired,
};
