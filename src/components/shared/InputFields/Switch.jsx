import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

const SwitchComponent = ({
  name,
  control,
  reset,
  updateFunction,
  ...props
}) => {
  const handleChange = (onChange, value) => {
    onChange(value);

    updateFunction(name, { [name]: value });
  };

  return (
    <FormControl {...props}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <Switch
              // eslint-disable-next-line react/prop-types
              checked={props.value}
              color="default"
              onChange={(e) => {
                handleChange(field.onChange, e.target.checked);
              }}
            />
          );
        }}
      />
    </FormControl>
  );
};

SwitchComponent.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.shape().isRequired,
  reset: PropTypes.func.isRequired,
  updateFunction: PropTypes.func.isRequired,
};

export default SwitchComponent;
