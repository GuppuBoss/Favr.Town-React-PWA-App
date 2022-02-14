/* eslint-disable react/jsx-max-depth */
import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import TrashIcon from '../../../components/shared/customIcons/TrashIcon';
import PhoneNumberInput from '../../../components/shared/InputFields/PhoneNumberInput';
import InputField from '../../../components/shared/InputFields/TextField';
import GenericAreYouSureModal from '../../../components/shared/modals/GenericAreYouSureModal';
import GenericModal from '../../../components/shared/modals/GenericModal';
import notificationType from '../../../constants/notification';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { DELETE, GET, PATCH } from '../../../services/api';
import getFeedbackMessage from '../../../utils/feedBackUtil';
import schema from '../locationFormSchema';
import classes from './locationDetail.module.scss';
import LoginForm from './LoginForm';
import NewLoginForm from './NewLoginForm';

const LocationForm = ({ defaultValues, flags, setLocation }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [shouldUpdateStateCity, setShouldUpdateStateCity] = useState(false);

  const { handleSubmit, formState, control, setValue, setError, trigger } =
    useForm({
      mode: 'onBlur',
      defaultValues: {
        about: defaultValues.about,
        businessName: defaultValues.businessName,
        city: defaultValues.city,
        state: defaultValues.state,
        street: defaultValues.street,
        website: defaultValues.website,
        phone: defaultValues.phone,
        zip: defaultValues.zip,
      },
      resolver: yupResolver(schema),
    });

  const updateProfile = async (field, payload) => {
    const isValid = await trigger(field);

    if (isValid) {
      const data = await PATCH('location', payload, params);
      if (data.error) {
        setError(field, {
          type: 'Submission',
          message: 'Error saving data',
        });
      }
    }
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

  const onGenericModalSubmit = async () => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, DELETE, 'login', {}, params)
    );

    if (response?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }

    if (!response?.error) {
      const feedbackMessage = getFeedbackMessage(response);
      toastNotification({
        type: notificationType.SUCCESS,
        message: feedbackMessage,
      });
      setIsConfirmationModalOpen(false);
      setLocation(response.item);
    }
  };

  return (
    <form id="profile_form_id" onSubmit={handleSubmit}>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item sm={12} xs={12}>
          <InputField
            autoUpdate
            control={control}
            error={formState.errors.businessName}
            fullWidth
            isPassword={false}
            label="Business Name"
            maxRows={4}
            minRows={3}
            multiline
            name="businessName"
            updateFunction={updateProfile}
          />
        </Grid>

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
        <Grid item sm={12} xs={12}>
          <InputField
            autoUpdate
            control={control}
            error={formState.errors.about}
            fullWidth
            isPassword={false}
            label="About"
            maxRows={6}
            minRows={3}
            multiline
            name="about"
            updateFunction={updateProfile}
          />
        </Grid>

        <Grid item sm={12} xs={12}>
          <InputField
            autoUpdate
            control={control}
            error={formState.errors.website}
            fullWidth
            isPassword={false}
            label="Website (optional)"
            name="website"
            updateFunction={updateProfile}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <PhoneNumberInput
            control={control}
            defaultCountry="US"
            error={formState.errors.phone}
            fullWidth
            label="Phone Number"
            name="phone"
            updateFunction={updateProfile}
          />
        </Grid>
        <Grid container item justifyContent="space-between" sm={12} xs={12}>
          <Typography className={classes.selfAlign} variant="body2">
            Cashier login
          </Typography>

          {flags.allow_login_add && (
            <>
              <Grid
                className={classes.selfAlign}
                item
                justifyContent="center"
                sm={7}
                xs={5}
              >
                <hr className="mt-2" />
              </Grid>
              <IconButton
                aria-label="close"
                onClick={() => setIsModalOpen(true)}
                size="medium"
              >
                <AddIcon />
              </IconButton>
            </>
          )}
          {flags.allow_login_remove && (
            <>
              <Grid
                className={classes.selfAlign}
                item
                justifyContent="center"
                sm={7}
                xs={5}
              >
                <hr className="mt-2" />
              </Grid>
              <IconButton
                aria-label="close"
                onClick={() => setIsConfirmationModalOpen(true)}
                size="medium"
              >
                <TrashIcon />
              </IconButton>
            </>
          )}
        </Grid>
        {flags?.allow_login_remove && (
          <LoginForm defaultValues={defaultValues} />
        )}
        {isConfirmationModalOpen && (
          <GenericAreYouSureModal
            handleClose={() => setIsConfirmationModalOpen(false)}
            isOpen={isConfirmationModalOpen}
            onSubmit={onGenericModalSubmit}
            warning="This will remove the cashier login credentials."
          />
        )}
        <GenericModal
          handleClose={() => setIsModalOpen(true)}
          isOpen={isModalOpen}
        >
          <NewLoginForm
            handleClose={() => setIsModalOpen(false)}
            setLocation={setLocation}
          />
        </GenericModal>
      </Grid>
    </form>
  );
};

LocationForm.propTypes = {
  defaultValues: PropTypes.shape({
    about: PropTypes.string.isRequired,
    email: PropTypes.number.isRequired,
    profile: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    businessName: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  flags: PropTypes.shape({
    allow_login_add: PropTypes.bool.isRequired,
    allow_login_remove: PropTypes.bool.isRequired,
  }).isRequired,
  setLocation: PropTypes.func.isRequired,
};

export default LocationForm;
