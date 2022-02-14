/* eslint-disable react/jsx-max-depth */
import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import InputField from '../../../components/shared/InputFields/TextField';
import TextFieldWithoutControl from '../../../components/shared/InputFields/TextFieldWithoutControl';
import { PATCH } from '../../../services/api';
import schema from './loginFormSchema';

const LoginForm = ({ defaultValues }) => {
  const params = useParams();

  const { handleSubmit, formState, control, setError, trigger } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const updateProfile = async (field, payload) => {
    const isValid = await trigger(field);

    if (isValid) {
      const data = await PATCH('login', payload, params);
      if (data.error) {
        setError(field, {
          type: 'Submission',
          message: 'Error saving data',
        });
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <form id="profile_form_id" onSubmit={handleSubmit}>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item sm={12} xs={12}>
          <TextFieldWithoutControl
            disabled
            error={formState.errors.login}
            fullWidth
            isPassword={false}
            label="login/username"
            name="login"
            value={defaultValues.login}
          />
        </Grid>

        <Grid item sm={12} xs={12}>
          <TextFieldWithoutControl
            disabled
            error={formState.errors.email}
            fullWidth
            isPassword={false}
            label="email"
            value={defaultValues.email}
          />
        </Grid>

        <Grid item sm={12} xs={12}>
          <InputField
            autoUpdate
            control={control}
            error={formState.errors.password}
            fullWidth
            isPassword={false}
            label="password"
            name="password"
            updateFunction={updateProfile}
          />
        </Grid>
      </Grid>
    </form>
  );
};

LoginForm.propTypes = {
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
};

export default LoginForm;
