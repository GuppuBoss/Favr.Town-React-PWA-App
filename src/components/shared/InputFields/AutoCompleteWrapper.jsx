import './override.scss';

import { FormHelperText, TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
// import classes from './inputField.module.scss';
const filter = createFilterOptions();

const AutoCompleteWrapper = ({
  value,
  isMultiple,
  isUpdateOnBlur,
  setValue,
  name,
  clearErrors,
  label,
  error,
  control,
  isDisabled,
  children,
  options,
  updateFunction,
  panelWidth,
  ...props
}) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
        width: panelWidth,
      },
    },
  };

  const labelId = `${name}-label`;
  return (
    <FormControl error={error?.message} {...props}>
      <Controller
        control={control}
        name={name}
        render={() => {
          return (
            <>
              <Autocomplete
                disabled={isDisabled}
                filterOptions={(filterOptions, params) => {
                  const filtered = filter(filterOptions, params);

                  // Suggest the creation of a new value
                  if (params.inputValue !== '') {
                    filtered.push({
                      inputValue: params.inputValue.toUpperCase(),
                      title: `Add "${params.inputValue.toUpperCase()}"`,
                    });
                  }

                  return filtered;
                }}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === 'string') {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.title;
                }}
                labelId={labelId}
                MenuProps={MenuProps}
                onChange={(event, newValue) => {
                  clearErrors(name);
                  if (typeof newValue === 'string') {
                    setValue({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                      title: newValue.inputValue,
                    });
                  } else {
                    setValue(newValue);
                  }
                }}
                options={options}
                renderInput={(params) => (
                  <TextField {...params} label={label} variant="outlined" />
                )}
                renderOption={(option) => {
                  return option.title;
                }}
              />
              {error?.message && (
                <FormHelperText>{error.message}</FormHelperText>
              )}
            </>
          );
        }}
      />
    </FormControl>
  );
};

AutoCompleteWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.shape().isRequired,
  isMultiple: PropTypes.bool.isRequired,
  isUpdateOnBlur: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  updateFunction: PropTypes.func.isRequired,
  panelWidth: PropTypes.number,
  // children: PropTypes.element().isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

AutoCompleteWrapper.defaultProps = {
  error: null,
  panelWidth: 250,
};

export default AutoCompleteWrapper;
