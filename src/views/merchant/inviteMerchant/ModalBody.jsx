/* eslint-disable react/jsx-max-depth */
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import React from 'react';

import UploadIcon from '../../../assets/images/icons/icon_upload.svg';
import classes from './addMerchant.module.scss';

const ModalBody = ({ error, handleClose, handleSubmit }) => {
  const handleUpload = async () => {
    await handleSubmit();
    handleClose();
  };

  return (
    <>
      <DialogContent className="remove-side-padding">
        <Grid
          className={classes.gridRoot}
          container
          justifyContent="space-between"
        >
          <Grid alignItems="center" container justifyContent="center">
            <Grid alignContent="center" item justifyContent="center">
              <Typography variant="body2">
                This will send an email to the provided address, telling them
                about FAVR.TOWN, and giving them the opportunity to join.
              </Typography>
              <Typography variant="body2">
                You&apos;ll earn FAVR if they do.
              </Typography>
              {error && <p className={classes.errorText}>{error.message}</p>}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="remove-side-padding">
        <Grid container justifyContent="space-between">
          <Grid className={classes.buttonWrapper} item>
            <Button
              aria-label="log-out"
              className={classes.iconButton}
              component="span"
              onClick={handleClose}
            >
              <CloseIcon fontSize="large" />
            </Button>
          </Grid>
          <Grid className={classes.buttonWrapper} item>
            <Button
              aria-label="log-out"
              className={classes.iconButton}
              component="span"
              onClick={handleUpload}
            >
              <img alt="upload" src={UploadIcon} />
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

ModalBody.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

ModalBody.defaultProps = {
  error: null,
};

export default ModalBody;
