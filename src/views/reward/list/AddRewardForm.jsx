import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@mui/material';
// import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

import uploadIcon from '../../../assets/images/icons/icon_upload.svg';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import DateTimePickerWrapper from '../../../components/shared/InputFields/DateTimePicker';
import TextFieldWrapper from '../../../components/shared/InputFields/TextField';
import { getTime24HoursFromNow } from '../../../utils/timeUtil';
import schema from '../rewardFormSchema';
import classes from '../rewards.module.scss';

const AddRewardForm = ({ isAddingReward, onSubmit }) => {
  const { control, trigger, formState, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      redeem_by: getTime24HoursFromNow(),
    },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent className="remove-side-padding">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldWrapper
              autoUpdate={false}
              control={control}
              error={formState.errors.description}
              fullWidth
              label="Reward description"
              maxRows={6}
              minRows={3}
              multiline
              name="description"
              trigger={trigger}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldWrapper
              autoUpdate={false}
              control={control}
              error={formState.errors.redeem}
              fullWidth
              label="Exclusion, limits"
              maxRows={5}
              minRows={4}
              multiline
              name="redeem"
              trigger={trigger}
            />
          </Grid>
          <Grid container item justifyContent="space-between" spacing={0}>
            <Grid item xs={4}>
              <TextFieldWrapper
                alignTextRight
                autoUpdate={false}
                control={control}
                error={formState.errors.favr}
                label="Favr value"
                name="favr"
                trigger={trigger}
                type="number"
              />
            </Grid>
            <Grid item xs={7}>
              <DateTimePickerWrapper
                alignTextRight
                autoUpdate={false}
                className={classes.datePicker}
                control={control}
                error={formState.errors.redeem_by}
                isFutureDateDisabled={false}
                label="Redeem by"
                margin="none"
                name="redeem_by"
                showDate
                trigger={trigger}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <Grid container item justifyContent="flex-end" xs={12}>
        <Button disabled={isAddingReward} type="submit">
          <StandardIcon alt="upload-icon" src={uploadIcon} />
        </Button>
      </Grid>
    </form>
  );
};

export default AddRewardForm;

AddRewardForm.propTypes = {
  isAddingReward: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  onSubmit: PropTypes.func.isRequired,
};
