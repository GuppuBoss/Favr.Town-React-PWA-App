/* eslint-disable react/jsx-max-depth */
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import DatePicker from '../../../components/shared/InputFields/DatePicker';
import Dropdown from '../../../components/shared/InputFields/DropDown';
import ImageViewerAndUpload from '../../../components/shared/InputFields/image/ImageViewerAndUpload';
import PhoneNumberInput from '../../../components/shared/InputFields/PhoneNumberInput';
import Switch from '../../../components/shared/InputFields/Switch';
import InputField from '../../../components/shared/InputFields/TextField';
import { defaultProfilePic } from '../../../constants/default';
import {
  deleteProfilePicture,
  patchProfile,
  uploadProfilePicture,
} from '../../../redux/actions/profileActions';
import { GET } from '../../../services/api';
import { getEpochSec } from '../../../utils/timeUtil';
import classes from './profile.module.scss';
import schema from './profileFormSchema';

const options = [
  {
    label: 'Mr',
    value: 'Mr',
  },
  {
    label: 'Ms',
    value: 'Ms',
  },
  {
    label: 'Miss',
    value: 'Miss',
  },
  {
    label: 'Mx',
    value: 'Mx',
  },
];

const ProfileForm = ({ defaultValues }) => {
  const [shouldUpdateStateCity, setShouldUpdateStateCity] = useState(false);
  const dispatch = useDispatch();

  const [profilePicture, setProfilePicture] = useState(
    defaultValues.profilePicture
      ? defaultValues.profilePicture
      : defaultProfilePic
  );
  const {
    handleSubmit,
    formState,
    control,
    watch,
    setValue,
    setError,
    trigger,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...defaultValues,
      birthday: defaultValues.birthday
        ? new Date(defaultValues.birthday * 1000)
        : new Date(),
    },
    resolver: yupResolver(schema),
  });

  const updateProfile = async (field, payload) => {
    const isValid = await trigger(field);

    if (isValid) {
      const data = await dispatch(patchProfile(dispatch, payload));
      if (data.error) {
        setError(field, {
          type: 'Submission',
          message: 'Error saving data',
        });
      }
    }
  };

  const updateDate = async (field, payload) => {
    const isValid = await trigger(field);

    if (isValid) {
      const date = getEpochSec(payload[field], 24);
      const data = await dispatch(patchProfile(dispatch, { [field]: date }));
      if (data.error) {
        setError(field, {
          type: 'Submission',
          message: 'Error saving data',
        });
      }
    }
  };

  const uploadFunction = async (payload) => {
    const data = await dispatch(
      uploadProfilePicture(dispatch, { image: payload, type: 'profile' })
    );
    if (data.error) {
      setError('profilePicture', {
        type: 'Submission',
        message: 'Error saving data',
      });
    }
    setProfilePicture(data?.item?.profilePicture);
  };

  const deleteFunction = async () => {
    await dispatch(deleteProfilePicture(dispatch, { url: profilePicture }));
    setProfilePicture(defaultProfilePic);
  };

  const acceptBirthdayGift = watch('accept_gift_birthday');
  const acceptMailInRewards = watch('accept_gift_mailin');
  const getSetting = async (zip) => {
    const result = await GET(`settings?type=zip&id=${zip}`);
    return result;
  };

  const resetZip = () => {
    setShouldUpdateStateCity(true);
    /*
     * NOTE: setValue didn't work inside async function.
     * So, added useEffect to set state and city.
     */
    // setValue('state', state);
    // setValue('city', city);
  };

  useEffect(() => {
    if (shouldUpdateStateCity) {
      setValue('state', defaultValues.state);
      setValue('city', defaultValues.city);

      setShouldUpdateStateCity(false);
    }
    return () => {};
  }, [shouldUpdateStateCity]);

  const onZipUpdate = async (field, payload) => {
    const isValid = await trigger(field);
    if (isValid) {
      const { item } = await getSetting(payload[field]);
      const isValidZip = !isEmpty(item);

      if (isValidZip) {
        await updateProfile('zip', {
          zip: payload[field],
          state: item.state,
          city: item.city,
        });
        resetZip(item.state, item.city);
      } else {
        setError('zip', {
          type: 'test',
          message: 'Invalid Zip',
        });
      }
    }
  };

  const getDropDownOptions = (dropDownOptions) => {
    return dropDownOptions.map((option) => (
      <MenuItem
        key={`salutation-dropdown-${option.value}`}
        value={option.value}
      >
        {option.label}
      </MenuItem>
    ));
  };

  return (
    <div className={classes.profileFormWrapper}>
      <form id="profile_form_id" onSubmit={handleSubmit}>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid container item justifyContent="flex-start" spacing={2}>
            <Grid className={classes.profileImageContainer} item sm={6} xs={6}>
              <div className={classes.profileImage}>
                <ImageViewerAndUpload
                  aspectRatioX={400}
                  aspectRatioY={400}
                  defaultPicture={profilePicture}
                  deleteFunction={deleteFunction}
                  error={formState?.errors?.profilePicture}
                  imageClassName={classes.profilePicWrapper}
                  isGrayScale
                  uploadFunction={uploadFunction}
                />
              </div>
            </Grid>
          </Grid>
          <Grid item sm={4} xs={4}>
            <Dropdown
              control={control}
              error={formState.errors.salutation}
              fullWidth
              id="salutation"
              isMultiple={false}
              isUpdateOnBlur
              label="Salutation"
              name="salutation"
              updateFunction={updateProfile}
              variant="outlined"
            >
              {getDropDownOptions(options)}
            </Dropdown>
          </Grid>
          <Grid item sm={8} xs={8}>
            <InputField
              autoUpdate
              control={control}
              error={formState.errors.firstName}
              fullWidth
              isPassword={false}
              label="First Name"
              name="firstName"
              updateFunction={updateProfile}
            />
          </Grid>

          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate
              control={control}
              error={formState.errors.lastName}
              fullWidth
              isPassword={false}
              label="Last Name"
              name="lastName"
              updateFunction={updateProfile}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <PhoneNumberInput
              control={control}
              defaultCountry="US"
              error={formState.errors.cell}
              fullWidth
              label="Phone Number"
              name="cell"
              updateFunction={updateProfile}
            />
          </Grid>
          <Grid item sm={9} xs={9}>
            <Typography className={classes.text} variant="body2">
              Accept Birthday Gift*
            </Typography>
          </Grid>
          <Grid item sm={2} xs={3}>
            <Switch
              control={control}
              error={formState.errors.accept_gift_birthday}
              fullWidth
              isPassword={false}
              label="Switch"
              name="accept_gift_birthday"
              updateFunction={updateProfile}
              value={acceptBirthdayGift}
            />
          </Grid>
          {acceptBirthdayGift && (
            <Grid item sm={12} xs={12}>
              <DatePicker
                alignTextRight
                autoUpdate
                control={control}
                error={formState.errors.birthday}
                fullWidth
                isFutureDateDisabled
                label="Birthday"
                name="birthday"
                updateFunction={updateDate}
              />
            </Grid>
          )}
          <Grid item sm={9} xs={9}>
            <Typography className={classes.text} variant="body2">
              Accept Mail-In Rewards*
            </Typography>
          </Grid>
          <Grid item sm={2} xs={3}>
            <Switch
              control={control}
              error={formState.errors.acceptMailInRewards}
              name="accept_gift_mailin"
              updateFunction={updateProfile}
              value={acceptMailInRewards}
            />
          </Grid>
          {acceptMailInRewards && (
            <>
              <Grid item sm={12} xs={12}>
                <InputField
                  autoUpdate
                  control={control}
                  error={formState.errors.street}
                  fullWidth
                  isPassword={false}
                  label="Street"
                  name="street"
                  updateFunction={updateProfile}
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
                  autoUpdate
                  control={control}
                  error={formState.errors.state}
                  fullWidth
                  isPassword={false}
                  label="State"
                  name="state"
                  updateFunction={updateProfile}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <InputField
                  autoUpdate
                  control={control}
                  error={formState.errors.city}
                  fullWidth
                  isPassword={false}
                  label="City"
                  name="city"
                  updateFunction={updateProfile}
                />
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </div>
  );
};

ProfileForm.propTypes = {
  defaultValues: PropTypes.shape({
    profilePicture: PropTypes.string.isRequired,
    birthday: PropTypes.number.isRequired,
    cell: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    salutation: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileForm;
