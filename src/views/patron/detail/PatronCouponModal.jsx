import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import DialogWrapper from '../../../components/shared/modals/GenericModal';
import { formatEpochTime } from '../../../utils/timeUtil';
import classes from '../patrons.module.scss';

const PatronCouponModal = ({
  couponData,
  isPatronCouponModalOpen,
  handlePatronCopunModalClose,
}) => {
  const linkToBeSliced = couponData?.link;

  return (
    <DialogWrapper
      handleClose={handlePatronCopunModalClose}
      isOpen={isPatronCouponModalOpen}
    >
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="h6">Coupon Redeemed</Typography>
        <IconButton
          aria-label="close"
          className="margin-left-auto"
          onClick={handlePatronCopunModalClose}
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
            label="Coupon"
            maxRows={6}
            minRows={3}
            multiline
            size="small"
            value={couponData?.text || ' '}
            variant="outlined"
          />
        </Grid>
        {couponData?.link && (
          <Grid item xs={12}>
            <Typography variant="body1">Website</Typography>
            {couponData?.link ? (
              <Button
                className={classes.websiteLink}
                onClick={() => window.open(couponData?.link, '_blank')}
              >
                {linkToBeSliced?.slice(0, 35)}
                ...
              </Button>
            ) : (
              '---'
            )}
          </Grid>
        )}
        {couponData?.redeem && (
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="Redeem"
              maxRows={6}
              minRows={3}
              multiline
              size="small"
              value={couponData?.redeem || ' '}
              variant="outlined"
            />
          </Grid>
        )}
        <Grid alignItems="flex-end" container item justifyContent="flex-end">
          <Typography variant="body1">
            Expires:{' '}
            {couponData?.redeem_by
              ? formatEpochTime(couponData?.redeem_by)
              : '--/--/----'}
          </Typography>
        </Grid>
        {couponData?.image && (
          <Grid item xs={12}>
            {couponData?.image ? (
              <Box
                border={1}
                borderColor="grey.500"
                borderRadius={5}
                height={220}
                overflow="hidden"
              >
                <img alt="patron-reward" src={couponData?.image} width="100%" />
              </Box>
            ) : (
              <Box border={1} borderColor="grey.500" borderRadius={5} p={1}>
                Image not found
              </Box>
            )}
          </Grid>
        )}
      </Grid>
    </DialogWrapper>
  );
};

export default PatronCouponModal;

PatronCouponModal.propTypes = {
  handlePatronCopunModalClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  couponData: PropTypes.object.isRequired,
  isPatronCouponModalOpen: PropTypes.bool.isRequired,
};
