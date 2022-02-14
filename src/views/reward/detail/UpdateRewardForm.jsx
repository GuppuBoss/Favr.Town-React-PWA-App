import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import DateTimePickerWrapper from '../../../components/shared/InputFields/DateTimePicker';
import ImageViewerAndUpload from '../../../components/shared/InputFields/image/ImageViewerAndUpload';
import TextFieldWrapper from '../../../components/shared/InputFields/TextField';
import debounce from '../../../utils/helpers';
import schema from '../rewardFormSchema';
import classes from '../rewards.module.scss';

const UpdateRewardForm = (props) => {
  const {
    onSubmit,
    rewardData,
    handleImageDelete,
    handleImageUpload,
    selectedImage,
  } = props;

  const { control, formState, setValue, trigger } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleSubmit = (e) => {
    const { name, value } = e.target;
    if (!formState.errors[name]) {
      if (name === 'favr') {
        onSubmit({ [name]: parseFloat(value) });
      } else if (name === 'redeem_by') {
        const dateCopy = new Date(value);
        dateCopy.setHours(17, 0, 0);
        onSubmit({ [name]: Math.floor(dateCopy / 1000) });
      } else {
        onSubmit({ [name]: value });
      }
    }
  };

  const handleDateChange = (name, data) => {
    const value = data[name];
    if (!formState.errors[name]) {
      if (name === 'redeem_by') {
        const dateCopy = new Date(value);
        // dateCopy.setHours(17, 0, 0);
        onSubmit({ [name]: Math.floor(dateCopy / 1000) });
      }
    }
  };

  const debounceOnchange = useCallback(debounce(handleSubmit, 1500), [
    formState.errors,
  ]);

  useEffect(() => {
    setValue('description', rewardData.description);
    setValue('favr', rewardData.favr);
    setValue('redeem_by', new Date(rewardData.redeem_by * 1000));
    setValue('redeem', rewardData.redeem || '');
  }, [rewardData]);

  return (
    <form>
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
            onChange={debounceOnchange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWrapper
            autoUpdate={false}
            control={control}
            error={formState.errors.redeem}
            fullWidth
            label="Exclusion, limits"
            maxRows={6}
            minRows={3}
            multiline
            name="redeem"
            onChange={debounceOnchange}
          />
        </Grid>

        <Grid item md={5} xs={12}>
          <TextFieldWrapper
            alignTextRight
            autoUpdate={false}
            control={control}
            error={formState.errors.favr}
            fullWidth
            label="Favr value"
            multiline={false}
            name="favr"
            onChange={debounceOnchange}
            type="number"
          />
        </Grid>
        <Grid item md={7} xs={12}>
          <DateTimePickerWrapper
            alignTextRight
            autoUpdate
            control={control}
            fullWidth
            isFutureDateDisabled={false}
            label="Redeem by"
            margin="none"
            name="redeem_by"
            showDate
            trigger={trigger}
            updateFunction={handleDateChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.rewardImgContainer}>
            <ImageViewerAndUpload
              aspectRatioX={800}
              aspectRatioY={600}
              defaultPicture={selectedImage}
              deleteFunction={handleImageDelete}
              isGrayScale
              uploadFunction={handleImageUpload}
            />
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default UpdateRewardForm;

UpdateRewardForm.propTypes = {
  selectedImage: PropTypes.string.isRequired,
  handleImageDelete: PropTypes.func.isRequired,
  handleImageUpload: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  rewardData: PropTypes.object.isRequired,
};
