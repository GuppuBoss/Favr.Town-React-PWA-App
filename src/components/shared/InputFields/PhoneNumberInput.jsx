import 'react-intl-tel-input/dist/main.css';

import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import IntlTelInput from 'react-intl-tel-input';

import classes from './inputField.module.scss';

const PhoneNumberInput = ({
  name,
  defaultCountry,
  control,
  error,
  updateFunction,
  ...props
}) => {
  const handleOnBlur = async (onChange, value, fullNumber) => {
    onChange(value);

    updateFunction(name, { [name]: fullNumber });
  };

  return (
    <FormControl {...props}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <IntlTelInput
              defaultCountry={defaultCountry}
              format="true"
              id="phone-input"
              inputClassName={
                error ? classes.phoneTelInputError : classes.phoneTelInput
              }
              onPhoneNumberBlur={(e, value, _countryCode, fullNumber) =>
                handleOnBlur(field.onBlur, value, fullNumber)
              }
              onPhoneNumberChange={(isValid, value) => {
                field.onChange(value);
              }}
              value={field.value}
            />
            <p className={classes.errorText}>{error?.message}</p>
          </>
        )}
        rules={{ required: true }}
      />
    </FormControl>
  );
};

PhoneNumberInput.propTypes = {
  defaultCountry: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.shape().isRequired,
  updateFunction: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

PhoneNumberInput.defaultProps = {
  error: null,
};

export default PhoneNumberInput;
