import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import StandardButton from '../../../components/shared/buttons/StandardButton';
import DialogWrapper from '../../../components/shared/modals/GenericModal';
import classList from '../../../components/shared/modals/modal.module.scss';

const PatronFavrModal = ({
  balance,
  handlePatronFavrModalClose,
  isPatronFavrModalOpen,
  sendWitdrawAction,
}) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  // track which button is clicked
  const [buttonActionType, setButtonActionType] = useState('');

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleConfirmAction = async () => {
    const action = {
      type: 'favr',
      amount:
        buttonActionType === 'send'
          ? parseFloat(amount)
          : -1 * parseFloat(amount),
    };
    await sendWitdrawAction(action);
    handleModalClose();
    setAmount('');
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    setAmount(value);
    if (
      value === '' ||
      (parseFloat(value) > 0 && parseFloat(value) <= balance)
    ) {
      setError('');
    } else {
      setError('Please enter valid input');
    }
  };
  return (
    <>
      <DialogWrapper
        handleClose={() => {
          setAmount('');
          handlePatronFavrModalClose();
        }}
        isOpen={isPatronFavrModalOpen}
      >
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography className="align-self-center" variant="h6">
            Send or withdraw Favr
          </Typography>
          <IconButton
            aria-label="close"
            className="margin-left-auto"
            onClick={() => {
              setAmount('');
              handlePatronFavrModalClose();
            }}
            size="small"
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          <Grid
            alignItems="center"
            container
            item
            justifyContent="space-between"
          >
            <Typography variant="body1">Balance</Typography>
            <Typography component="div" variant="h6">
              <Box fontWeight="600">{balance}</Box>
            </Typography>
          </Grid>
          <Grid
            alignItems="center"
            container
            item
            justifyContent="space-between"
          >
            <Typography variant="body1">Amount</Typography>
            <TextField
              error={error}
              helperText={error}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'right' },
                },
              }}
              onChange={handleInputChange}
              value={amount}
              variant="outlined"
            />
          </Grid>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
            mb={2}
            mt={1}
            p={1}
            width="100%"
          >
            <StandardButton
              isDisabled={!amount || !!error}
              onClick={() => {
                setButtonActionType('withdraw');
                handleModalOpen();
              }}
              variant="contained"
            >
              WITHDRAW
            </StandardButton>
            <StandardButton
              isDisabled={!amount || !!error}
              onClick={() => {
                setButtonActionType('send');
                handleModalOpen();
              }}
              variant="contained"
            >
              SEND
            </StandardButton>
          </Box>
        </Grid>
      </DialogWrapper>
      <DialogWrapper handleClose={handleModalClose} isOpen={isModalOpen}>
        <Box fontWeight={600} mb={2}>
          ARE YOU SURE?
        </Box>
        <div className={classList.areYouSureModalButtonWrapper}>
          <button
            className={classList.normalButtonWrapper}
            onClick={handleModalClose}
            type="button"
          >
            CANCEL
          </button>
          <button
            className={classList.normalButtonWrapper}
            onClick={handleConfirmAction}
            type="button"
          >
            CONFIRM
          </button>
        </div>
      </DialogWrapper>
    </>
  );
};

export default PatronFavrModal;

PatronFavrModal.propTypes = {
  handlePatronFavrModalClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  balance: PropTypes.number.isRequired,
  isPatronFavrModalOpen: PropTypes.bool.isRequired,
  sendWitdrawAction: PropTypes.func.isRequired,
};
