/* eslint-disable react/jsx-max-depth */
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

import UploadIcon from '../../../assets/images/icons/icon_upload.svg';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import DateTimePickerWrapper from '../../../components/shared/InputFields/DateTimePicker';
import InputField from '../../../components/shared/InputFields/TextField';
import { getEpochSec, getTime24HoursFromNow } from '../../../utils/timeUtil';
import classes from '../survey.module.scss';
import surveySchema from './createSurveySchema';

const CreateSurveyModalBody = ({ handleClose, handleUpload }) => {
  const defaultValues = {
    question: '',
    end: getTime24HoursFromNow(),
  };
  const onSubmit = async (data) => {
    const epochTime = getEpochSec(data.end);

    await handleUpload({ ...data, end: epochTime });
    handleClose();
  };

  const { control, formState, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(surveySchema),
  });

  return (
    <>
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">Create new Survey</Typography>
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
                error={formState.errors.question}
                fullWidth
                isPassword={false}
                label="Question and background"
                maxRows={6}
                minRows={3}
                multiline
                name="question"
              />
            </Grid>
            <Grid container item justifyContent="flex-end" sm={12} xs={12}>
              <Grid
                container
                item
                justifyContent="space-between"
                sm={12}
                xs={12}
              >
                <Grid className={classes.selfAlign} item sm={4} xs={4}>
                  <Typography variant="body2">Survey ends:</Typography>
                </Grid>
                <Grid item sm={7} xs={7}>
                  <DateTimePickerWrapper
                    alignTextRight
                    autoUpdate={false}
                    control={control}
                    error={formState.errors.end}
                    fullWidth
                    isFutureDateDisabled={false}
                    margin="none"
                    name="end"
                    showDate
                  />
                </Grid>
              </Grid>
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

CreateSurveyModalBody.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

CreateSurveyModalBody.defaultProps = {
  error: null,
};

export default CreateSurveyModalBody;
