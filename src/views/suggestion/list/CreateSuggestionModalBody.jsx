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
import InputField from '../../../components/shared/InputFields/TextField';
import createSuggestionSchema from './createSuggestionSchema';
import classes from './suggestion.module.scss';

const CreateSuggestionModalBody = ({
  handleClose,
  createType,
  handleUpload,
}) => {
  const isCoupon = createType === 'coupon';
  const defaultValues = isCoupon
    ? {
        redeem_by: isCoupon ? new Date() : undefined,
      }
    : {};
  const onSubmit = async (data) => {
    await handleUpload(data);
  };

  const { control, formState, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(createSuggestionSchema),
  });

  return (
    <>
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">New Suggestion</Typography>
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
                error={formState.errors.suggestion}
                fullWidth
                isPassword={false}
                label="Text"
                maxRows={6}
                minRows={3}
                multiline
                name="suggestion"
              />
            </Grid>
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

CreateSuggestionModalBody.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  createType: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

CreateSuggestionModalBody.defaultProps = {
  error: null,
};

export default CreateSuggestionModalBody;
