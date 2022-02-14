/* eslint-disable react/jsx-max-depth */
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

import UploadIcon from '../../../assets/images/icons/icon_upload.svg';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import DateTimePickerWrapper from '../../../components/shared/InputFields/DateTimePicker';
import InputField from '../../../components/shared/InputFields/TextField';
import { getEpochSec, getTime24HoursFromNow } from '../../../utils/timeUtil';
import couponSchema from './createCouponSchema';
import newsSchema from './createNewsSchema';
import classes from './news.module.scss';

const CreateNewsModalBody = ({ handleClose, createType, handleUpload }) => {
  const isCoupon = createType === 'coupon';
  const defaultValues = isCoupon
    ? {
        redeem_by: isCoupon ? getTime24HoursFromNow() : undefined,
      }
    : {};
  const onSubmit = async (data) => {
    if (isCoupon) {
      const redeemBy = getEpochSec(data.redeem_by);
      await handleUpload({ ...data, redeem_by: redeemBy }, 'coupon');
    } else {
      await handleUpload(data, 'news');
    }
  };

  const { control, formState, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(isCoupon ? couponSchema : newsSchema),
  });

  return (
    <>
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">
          {isCoupon ? 'New Coupon' : 'Post News'}
        </Typography>
        <IconButton
          aria-label="close"
          className="margin-left-auto"
          onClick={handleClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="remove-side-padding">
          <Grid className={classes.gridRoot} container spacing={2}>
            <Grid item sm={12} xs={12}>
              <InputField
                autoUpdate={false}
                control={control}
                error={formState.errors.text}
                fullWidth
                isPassword={false}
                label="Text"
                maxRows={6}
                minRows={3}
                multiline
                name="text"
              />
            </Grid>

            <Grid item sm={12} xs={12}>
              <InputField
                autoUpdate={false}
                control={control}
                error={formState.errors.link}
                fullWidth
                isPassword={false}
                label="URL"
                name="link"
              />
            </Grid>
            {isCoupon && (
              <Grid container item justifyContent="flex-end" sm={12} xs={12}>
                <Grid
                  container
                  item
                  justifyContent="space-between"
                  sm={12}
                  xs={12}
                >
                  <Grid className={classes.selfAlign} item sm={3} xs={3}>
                    <Typography variant="body2">Expires:</Typography>
                  </Grid>
                  <Grid item sm={7} xs={7}>
                    <DateTimePickerWrapper
                      alignTextRight
                      autoUpdate={false}
                      control={control}
                      error={formState.errors.redeem_by}
                      fullWidth
                      isFutureDateDisabled={false}
                      isPastDateDisabled
                      label="Redeem By"
                      margin="none"
                      name="redeem_by"
                      showDate
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions className="remove-side-padding">
          <Grid container justifyContent="flex-end">
            <Grid className={classes.buttonWrapper} item>
              <Button
                aria-label="log-out"
                className={classes.iconButton}
                component="button"
                type="submit"
              >
                <StandardIcon alt="upload" src={UploadIcon} />
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </>
  );
};

CreateNewsModalBody.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  createType: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

CreateNewsModalBody.defaultProps = {
  error: null,
};

export default CreateNewsModalBody;
