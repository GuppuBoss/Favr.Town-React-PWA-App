import CloseIcon from '@mui/icons-material/Close';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Box,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import TextFieldWithoutControl from '../../../components/shared/InputFields/TextFieldWithoutControl';
import { formatEpochTime } from '../../../utils/timeUtil';

const PatronDetailModalBody = ({
  handlePatronDetailModalClose,
  patronDetails,
}) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography className="align-self-center" variant="h6">
          Patron Details
        </Typography>
        <IconButton
          aria-label="close"
          className="margin-left-auto"
          onClick={handlePatronDetailModalClose}
          size="small"
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            disabled
            fullWidth
            label="Name"
            value={patronDetails?.name || ' '}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled
            fullWidth
            label="Phone Number"
            value={patronDetails?.phone || ' '}
            variant="outlined"
          />
        </Grid>
        <Grid alignItems="center" container item justifyContent="space-between">
          <Typography variant="body1">Accept Birthday Gift</Typography>
          <Switch
            checked={patronDetails?.accept_birthday || false}
            color="default"
            disabled
          />
        </Grid>
        {patronDetails?.accept_birthday && (
          <Grid
            alignItems="center"
            container
            item
            justifyContent="space-between"
          >
            <Typography variant="body1">Birthday</Typography>
            <Grid item sm={6} xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TextFieldWithoutControl
                  alignTextRight
                  disabled
                  format="MM/dd/yyyy"
                  inputVariant="outlined"
                  value={
                    patronDetails?.birthday
                      ? formatEpochTime(patronDetails.birthday, 'MM/dd/yyyy')
                      : null
                  }
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        )}
        <Grid alignItems="center" container item justifyContent="space-between">
          <Typography variant="body1">Accept Mail-In Rewards</Typography>
          <Switch
            checked={patronDetails?.accept_mail || false}
            color="default"
            disabled
          />
        </Grid>
        {patronDetails?.accept_mail && (
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="Address"
              maxRows={6}
              minRows={3}
              multiline
              size="small"
              value={patronDetails?.mail || ' '}
              variant="outlined"
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default PatronDetailModalBody;

PatronDetailModalBody.propTypes = {
  handlePatronDetailModalClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  patronDetails: PropTypes.object.isRequired,
};
