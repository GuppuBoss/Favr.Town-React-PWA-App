/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import InputField from '../../components/shared/InputFields/TextField';
import classes from './signIn.module.scss';
import schema from './signInFormSchema';

const SignInForm = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, dirtyFields, isDirty },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isDirty && isValid) {
      props.setIsDisabledSignIn(false);
    } else {
      props.setIsDisabledSignIn(true);
    }
    if (isValid) {
      props.setIsDisabledJoin(true);
    } else {
      props.setIsDisabledJoin(false);
    }
  }, [dirtyFields, isDirty, isValid]);

  return (
    <div className={classes.signinPageFromWrapper}>
      <form id="sigin_form_id" onSubmit={handleSubmit(props.onSubmit)}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate={false}
              control={control}
              error={errors.login}
              fullWidth
              label="Login"
              name="login"
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate={false}
              control={control}
              error={errors.password}
              fullWidth
              label="Password"
              name="password"
              type="password"
            />
          </Grid>
        </Grid>

        <div className={classes.forgetPasswordWrapper}>
          <div className={classes.forgetPassword} onClick={props.handleOpen}>
            I forgot
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

SignInForm.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setIsDisabledJoin: PropTypes.func.isRequired,
  setIsDisabledSignIn: PropTypes.func.isRequired,
};
