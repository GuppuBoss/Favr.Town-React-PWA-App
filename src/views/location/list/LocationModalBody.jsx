/* eslint-disable react/jsx-max-depth */

import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import UploadIcon from '../../../assets/images/icons/icon_upload.svg';
import InputField from '../../../components/shared/InputFields/TextField';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { GET, PATCH } from '../../../services/api';
import schema from '../locationFormSchema';
import classes from './locations.module.scss';

const LocationModalBody = ({
  defaultBusinessName,
  handleClose,
  onLocationCreate,
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const { handleSubmit, formState, control, setValue, trigger, setError } =
    useForm({
      mode: 'onBlur',
      resolver: yupResolver(schema),
      defaultValues: { state, city, businessName: defaultBusinessName },
    });

  const onSubmit = async (data) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PATCH, 'location', data)
    );
    onLocationCreate(response);
  };

  const getSetting = async (zip) => {
    const result = await GET(`settings?type=zip&id=${zip}`);
    return result;
  };

  const onZipUpdate = async (field, payload) => {
    const isValid = await trigger(field);

    if (isValid) {
      const { item } = await getSetting(payload[field]);
      const isValidZip = !isEmpty(item);

      if (isValidZip) {
        setState(item.state);
        setCity(item.city);
      } else {
        setError('zip', {
          type: 'test',
          message: 'Invalid Zip',
        });
      }
    }
  };
  useEffect(() => {
    setValue('state', state);
    return () => {};
  }, [state]);
  useEffect(() => {
    setValue('city', city);
    return () => {};
  }, [city]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">Add Store Location</Typography>
        <IconButton
          aria-label="close"
          className="margin-left-auto"
          onClick={() => handleClose(false)}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>

      <DialogContent className="remove-side-padding">
        <Grid
          className={classes.gridRoot}
          container
          justifyContent="space-between"
          spacing={2}
        >
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate={false}
              control={control}
              error={formState.errors.businessName}
              fullWidth
              isPassword={false}
              label="Business Name"
              maxRows={6}
              minRows={3}
              multiline
              name="businessName"
            />
          </Grid>

          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate={false}
              control={control}
              error={formState.errors.street}
              fullWidth
              isPassword={false}
              label="Street"
              name="street"
            />
          </Grid>
          <Grid item sm={6} xs={6}>
            <InputField
              autoUpdate
              control={control}
              error={formState.errors.zip}
              fullWidth
              isPassword={false}
              label="ZIP"
              name="zip"
              updateFunction={onZipUpdate}
            />
          </Grid>
          <Grid item sm={6} xs={6}>
            <InputField
              autoUpdate={false}
              control={control}
              error={formState.errors.state}
              fullWidth
              isPassword={false}
              label="State"
              name="state"
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate={false}
              control={control}
              error={formState.errors.city}
              fullWidth
              isPassword={false}
              label="City"
              name="city"
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
              type="submit"
            >
              <img alt="upload" src={UploadIcon} />
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </form>
  );
};

LocationModalBody.propTypes = {
  handleClose: PropTypes.func.isRequired,
  defaultBusinessName: PropTypes.string.isRequired,
  onLocationCreate: PropTypes.func.isRequired,
};

export default LocationModalBody;
