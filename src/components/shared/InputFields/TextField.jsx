/* eslint-disable react-perf/jsx-no-jsx-as-prop */
/* eslint-disable react/boolean-prop-naming */

import './override.scss';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

const TextFieldWrapper = ({
  autoUpdate,
  name,
  label,
  minRows = 3,
  maxRows = 5,
  multiline = false,
  disabled = false,
  control,
  error,
  readOnly,
  type,
  updateFunction,
  alignTextRight,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const debounceFunction = _.debounce(async (e) => {
    await updateFunction(name, { [name]: e.target.value });
  }, 1000);
  const handleChange = async (onChange, e) => {
    onChange(e);
    if (!autoUpdate) {
      return;
    }
    debounceFunction(e);
  };
  const handleClickShowPassword = () => {
    setIsVisible(!isVisible);
  };

  const inputProps = (typeValue) => {
    if (typeValue === 'password') {
      return {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              style={{ padding: '5px' }}
            >
              {isVisible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
        readOnly,
      };
    }
    if (alignTextRight) {
      return {
        inputProps: {
          style: { textAlign: 'right' },
        },
      };
    }

    return { readOnly };
  };
  return (
    <FormControl {...props}>
      <Controller
        control={control || undefined}
        name={name}
        render={({ field }) => {
          return (
            <TextField
              ref={field.ref}
              disabled={disabled}
              error={error}
              helperText={error?.message}
              InputProps={inputProps(type)}
              label={label}
              labelWidth={70}
              maxRows={maxRows}
              minRows={minRows}
              multiline={multiline}
              name={field.name}
              // onBlur={async (e) => {
              //   await handleOnBlur(field.onBlur, e);
              // }}
              // eslint-disable-next-line react/jsx-handler-names
              onChange={(e) => {
                handleChange(field.onChange, e);
              }}
              size="small"
              type={isVisible ? 'text' : type}
              value={field.value}
              variant="outlined"
            />
          );
        }}
      />
    </FormControl>
  );
};

TextFieldWrapper.propTypes = {
  autoUpdate: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  multiline: PropTypes.bool.isRequired,
  maxRows: PropTypes.number.isRequired,
  minRows: PropTypes.number.isRequired,
  control: PropTypes.shape().isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  updateFunction: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  alignTextRight: PropTypes.bool.isRequired,
};

TextFieldWrapper.defaultProps = {
  error: null,
  type: 'text',
  readOnly: false,
};

export default TextFieldWrapper;
